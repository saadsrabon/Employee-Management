import React, { useState } from 'react';
import { Users, Eye, DollarSign, CheckCircle, X, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const { authFetch } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [paymentModal, setPaymentModal] = useState({ isOpen: false, employee: null });
    const [paymentData, setPaymentData] = useState({
        month: '',
        year: new Date().getFullYear()
    });

    // Fetch employees
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await authFetch('/employee-list');
            if (!res.ok) throw new Error('Failed to fetch employees');
            const json = await res.json();
            return json.employees;
        }
    });
    const employees = data || [];

    // Mutation: verify/unverify
    const verifyMutation = useMutation({
        mutationFn: async (id) => {
            const res = await authFetch(`/users/${id}/verify`, { method: 'PATCH' });
            if (!res.ok) throw new Error('Failed to update verification');
            return res.json();
        },
        onSuccess: () => {
            toast.success('Verification status updated!');
            queryClient.invalidateQueries(['employees']);
        },
        onError: (err) => toast.error(err.message)
    });

    // Mutation: payment request
    const payMutation = useMutation({
        mutationFn: async ({ employee, month, year }) => {
            const res = await authFetch('/payroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: employee._id,
                    month,
                    year,
                    amount: employee.salary
                })
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to request payment');
            return json;
        },
        onSuccess: () => {
            toast.success('Payment request sent!');
            setPaymentModal({ isOpen: false, employee: null });
        },
        onError: (err) => toast.error(err.message)
    });

    const handleVerify = (id) => {
        verifyMutation.mutate(id);
    };

    const handlePayment = (employee) => {
        setPaymentModal({ isOpen: true, employee });
    };

    const handleSendPayment = () => {
        if (!paymentData.month || !paymentData.year) {
            toast.error('Please select month and year');
            return;
        }
        payMutation.mutate({
            employee: paymentModal.employee,
            month: paymentData.month,
            year: paymentData.year
        });
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h1>
                    <p className="text-gray-600">Manage employee verification and payments</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Verified</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {employees.filter(emp => emp.isVerified).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-orange-100 p-3 rounded-full">
                                <X className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {employees.filter(emp => !emp.isVerified).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading/Error States */}
                {isLoading && <div className="text-center py-8">Loading employees...</div>}
                {isError && <div className="text-center text-red-600 py-8">{error.message}</div>}

                {/* Employee Table */}
                {!isLoading && !isError && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Employee List</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Verified
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Account
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Salary
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.map((employee) =>
                                    employee && employee._id ? (
                                        <tr key={employee._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={employee.photo}
                                                            alt={employee.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                        <div className="text-sm text-gray-500">{employee.designation}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {employee.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleVerify(employee._id)}
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${employee.isVerified
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    }`}
                                                    disabled={verifyMutation.isLoading}
                                                >
                                                    {employee.isVerified ? "Verified" : "Unverified"}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {employee.bank_account_no}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${employee.salary?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handlePayment(employee)}
                                                        disabled={!employee.isVerified}
                                                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                                                    >
                                                        <DollarSign className="h-4 w-4" />
                                                        <span>Pay</span>
                                                    </button>
                                                    <button
                                                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                                                        onClick={() => navigate(`/details/${employee._id}`)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>Details</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}

                {/* Payment Modal */}
                {paymentModal.isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Process Payment for {paymentModal.employee?.name}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Salary Amount
                                    </label>
                                    <input
                                        type="text"
                                        value={`$${paymentModal.employee?.salary?.toLocaleString()}`}
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Month
                                    </label>
                                    <select
                                        value={paymentData.month}
                                        onChange={(e) => setPaymentData({ ...paymentData, month: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Month</option>
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        value={paymentData.year}
                                        onChange={(e) => setPaymentData({ ...paymentData, year: parseInt(e.target.value) })}
                                        min="2020"
                                        max="2030"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentModal({ isOpen: false, employee: null })}
                                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSendPayment}
                                        disabled={payMutation.isLoading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 disabled:opacity-50"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        <span>{payMutation.isLoading ? 'Sending...' : 'Send Payment Request'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;