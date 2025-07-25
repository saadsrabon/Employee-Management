import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const taskOptions = ['Sales', 'Support', 'Content', 'Paper-work', 'Development', 'Marketing'];

const WorkSheet = () => {
    const { authFetch } = useAuth();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        task: '',
        hoursWorked: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [editId, setEditId] = useState(null);

    // Fetch worksheets
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['worksheets'],
        queryFn: async () => {
            const res = await authFetch('/work-sheets');
            if (!res.ok) throw new Error('Failed to fetch worksheets');
            const json = await res.json();
            return json.workSheets;
        }
    });
    const workSheets = data || [];
    const sortedWorkSheets = [...workSheets].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Add worksheet mutation
    const addMutation = useMutation({
        mutationFn: async (newData) => {
            const res = await authFetch('/work-sheets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to add worksheet');
            return json;
        },
        onSuccess: () => {
            toast.success('Work entry added!');
            setFormData({ task: '', hoursWorked: '', date: new Date().toISOString().split('T')[0] });
            queryClient.invalidateQueries(['worksheets']);
        },
        onError: (err) => toast.error(err.message)
    });

    // Edit worksheet mutation
    const editMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await authFetch(`/work-sheets/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to update worksheet');
            return json;
        },
        onSuccess: () => {
            toast.success('Work entry updated!');
            setShowEditModal(false);
            setEditFormData({});
            setEditId(null);
            queryClient.invalidateQueries(['worksheets']);
        },
        onError: (err) => toast.error(err.message)
    });

    // Delete worksheet mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await authFetch(`/work-sheets/${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to delete worksheet');
            return json;
        },
        onSuccess: () => {
            toast.success('Work entry deleted!');
            queryClient.invalidateQueries(['worksheets']);
        },
        onError: (err) => toast.error(err.message)
    });

    // Add work entry
    const handleAdd = () => {
        if (!formData.task || !formData.hoursWorked || !formData.date) {
            toast.error('Please fill all fields');
            return;
        }
        addMutation.mutate({
            task: formData.task,
            hoursWorked: Number(formData.hoursWorked),
            date: formData.date
        });
    };

    // Edit work entry
    const handleEdit = (workSheet) => {
        setEditFormData({
            task: workSheet.task,
            hoursWorked: workSheet.hoursWorked,
            date: workSheet.date.split('T')[0]
        });
        setEditId(workSheet._id);
        setShowEditModal(true);
    };

    // Update work entry
    const handleUpdate = () => {
        if (!editFormData.task || !editFormData.hoursWorked || !editFormData.date) {
            toast.error('Please fill all fields');
            return;
        }
        editMutation.mutate({
            id: editId,
            data: {
                task: editFormData.task,
                hoursWorked: Number(editFormData.hoursWorked),
                date: editFormData.date
            }
        });
    };

    // Delete work entry
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            deleteMutation.mutate(id);
        }
    };

    // Calculate total hours
    const totalHours = workSheets.reduce((sum, ws) => sum + Number(ws.hoursWorked), 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Sheet</h1>
                    <p className="text-gray-600">Track your daily tasks and work hours</p>
                </div>

                {/* Add Work Sheet Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Work Entry</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
                                Task
                            </label>
                            <select
                                id="task"
                                value={formData.task}
                                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Task</option>
                                {taskOptions.map(task => (
                                    <option key={task} value={task}>{task}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700 mb-2">
                                Hours Worked
                            </label>
                            <input
                                type="number"
                                id="hoursWorked"
                                value={formData.hoursWorked}
                                onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                                min="0"
                                max="24"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="8"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleAdd}
                            disabled={addMutation.isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2 disabled:opacity-50"
                        >
                            <Plus className="h-5 w-5" />
                            <span>{addMutation.isLoading ? 'Adding...' : 'Add'}</span>
                        </button>
                    </div>
                </div>

                {/* Total Hours */}
                <div className="mb-4 text-right text-lg font-semibold text-blue-700">
                    Total Hours: {totalHours}
                </div>

                {/* Work Sheets Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Work History</h2>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : isError ? (
                        <div className="text-center text-red-600 py-8">{error.message}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Task
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hours Worked
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedWorkSheets.map((workSheet) => (
                                        <tr key={workSheet._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <CheckCircle className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{workSheet.task}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">{workSheet.hoursWorked} hours</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">
                                                        {new Date(workSheet.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(workSheet)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(workSheet._id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Work Sheet</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="editTask" className="block text-sm font-medium text-gray-700 mb-2">
                                        Task
                                    </label>
                                    <select
                                        id="editTask"
                                        value={editFormData.task || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, task: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Task</option>
                                        {taskOptions.map(task => (
                                            <option key={task} value={task}>{task}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="editHoursWorked" className="block text-sm font-medium text-gray-700 mb-2">
                                        Hours Worked
                                    </label>
                                    <input
                                        type="number"
                                        id="editHoursWorked"
                                        value={editFormData.hoursWorked || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, hoursWorked: e.target.value })}
                                        min="0"
                                        max="24"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="editDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="editDate"
                                        value={editFormData.date || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        disabled={editMutation.isLoading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {editMutation.isLoading ? 'Updating...' : 'Update'}
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

export default WorkSheet;