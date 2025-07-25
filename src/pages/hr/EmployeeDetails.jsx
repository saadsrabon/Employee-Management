import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { authFetch, user: currentUser } = useAuth();
  const [newSalary, setNewSalary] = useState('');

  // Fetch employee details
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['employee-details', id],
    queryFn: async () => {
      const res = await authFetch(`/employee-details/${id}`);
      if (!res.ok) throw new Error('Failed to fetch employee details');
      return res.json();
    }
  });

  // Fire mutation
  const fireMutation = useMutation({
    mutationFn: async () => {
      const res = await authFetch(`/users/${id}/fire`, { method: 'PATCH' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fire user');
      return json;
    },
    onSuccess: () => {
      toast.success('User fired!');
      refetch();
    },
    onError: (err) => toast.error(err.message)
  });

  // Promote to HR mutation
  const promoteMutation = useMutation({
    mutationFn: async () => {
      const res = await authFetch(`/users/${id}/make-hr`, { method: 'PATCH' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to promote user');
      return json;
    },
    onSuccess: () => {
      toast.success('User promoted to HR!');
      refetch();
    },
    onError: (err) => toast.error(err.message)
  });

  // Increase salary mutation
  const salaryMutation = useMutation({
    mutationFn: async (salary) => {
      const res = await authFetch(`/users/${id}/salary`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newSalary: salary })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update salary');
      return json;
    },
    onSuccess: () => {
      toast.success('Salary updated!');
      setNewSalary('');
      refetch();
    },
    onError: (err) => toast.error(err.message)
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center text-red-600 py-8">{error.message}</div>;

  const { name, photo, designation, payments, role, isFired, salary } = data;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <img src={photo} alt={name} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">{designation}</p>
          <div className="mt-2 text-sm">
            <span className="font-semibold">Role:</span> {role}
            <span className="ml-4 font-semibold">Status:</span> {isFired ? <span className="text-red-600">Fired</span> : <span className="text-green-600">Active</span>}
            <span className="ml-4 font-semibold">Current Salary:</span> ${salary?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {currentUser?.role === 'Admin' && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border space-y-3">
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              onClick={() => fireMutation.mutate()}
              disabled={isFired || fireMutation.isLoading}
              className={`px-4 py-2 rounded-md text-white ${isFired ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
            >
              {isFired ? 'Fired' : fireMutation.isLoading ? 'Firing...' : 'Fire'}
            </button>
            {role !== 'HR' && !isFired && (
              <button
                onClick={() => promoteMutation.mutate()}
                disabled={promoteMutation.isLoading}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {promoteMutation.isLoading ? 'Promoting...' : 'Promote to HR'}
              </button>
            )}
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newSalary || isNaN(newSalary) || Number(newSalary) <= Number(salary)) {
                toast.error('Enter a valid increased salary');
                return;
              }
              salaryMutation.mutate(Number(newSalary));
            }}
            className="flex items-center space-x-2 mt-2"
          >
            <input
              type="number"
              min={Number(salary) + 1}
              value={newSalary}
              onChange={e => setNewSalary(e.target.value)}
              placeholder={`Increase salary (current: $${salary})`}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isFired}
            />
            <button
              type="submit"
              disabled={salaryMutation.isLoading || isFired}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              {salaryMutation.isLoading ? 'Updating...' : 'Increase Salary'}
            </button>
          </form>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Salary Payment History</h3>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Month</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {payments && payments.length > 0 ? payments.map((p, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2">{p.month}</td>
              <td className="px-4 py-2">{p.year}</td>
              <td className="px-4 py-2">${p.amount}</td>
              <td className="px-4 py-2">{p.transactionId}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-gray-500">No payments found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* You can add a chart here using chart.js or recharts if required */}
    </div>
  );
};

export default EmployeeDetails;