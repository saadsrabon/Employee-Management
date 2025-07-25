import React, { useState } from 'react';
import { Users, UserX, UserCheck, Grid, List, Edit } from 'lucide-react';

const AllEmployeeList = () => {
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

    // Mock data for design purposes
    const verifiedUsers = [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@company.com",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            designation: "Senior Developer",
            salary: 75000,
            role: "employee",
            isFired: false
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.johnson@company.com",
            photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
            designation: "HR Manager",
            salary: 65000,
            role: "hr",
            isFired: false
        },
        {
            id: 3,
            name: "Mike Davis",
            email: "mike.davis@company.com",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            designation: "Marketing Specialist",
            salary: 55000,
            role: "employee",
            isFired: false
        },
        {
            id: 4,
            name: "Emily Chen",
            email: "emily.chen@company.com",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            designation: "UX Designer",
            salary: 68000,
            role: "employee",
            isFired: false
        },
        {
            id: 5,
            name: "Robert Wilson",
            email: "robert.wilson@company.com",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            designation: "Project Manager",
            salary: 72000,
            role: "hr",
            isFired: true
        }
    ];

    const TableView = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Designation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {verifiedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={user.photo}
                                            alt={user.name}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.designation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-900">${user.salary?.toLocaleString()}</span>
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'hr'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {user.role.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    {user.isFired ? (
                                        <span className="text-red-600 font-medium">Fired</span>
                                    ) : (
                                        <button className="text-red-600 hover:text-red-900 flex items-center space-x-1">
                                            <UserX className="h-4 w-4" />
                                            <span>Fire</span>
                                        </button>
                                    )}

                                    {user.role === 'employee' && !user.isFired && (
                                        <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                                            <UserCheck className="h-4 w-4" />
                                            <span>Make HR</span>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <img
                            src={user.photo}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.designation}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Salary:</span>
                            <div className="flex items-center space-x-1">
                                <span className="text-sm text-gray-900">${user.salary?.toLocaleString()}</span>
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Edit className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Role:</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.role === 'hr'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        {user.isFired ? (
                            <span className="text-red-600 font-medium text-sm">Fired</span>
                        ) : (
                            <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm flex items-center justify-center space-x-1">
                                <UserX className="h-4 w-4" />
                                <span>Fire</span>
                            </button>
                        )}

                        {user.role === 'employee' && !user.isFired && (
                            <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 text-sm flex items-center justify-center space-x-1">
                                <UserCheck className="h-4 w-4" />
                                <span>Make HR</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Employees</h1>
                            <p className="text-gray-600">Manage all verified employees and HR staff</p>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'table'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{verifiedUsers.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <UserCheck className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Employees</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {verifiedUsers.filter(u => u.role === 'employee').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">HR Staff</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {verifiedUsers.filter(u => u.role === 'hr').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-red-100 p-3 rounded-full">
                                <UserX className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Fired</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {verifiedUsers.filter(u => u.isFired).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {viewMode === 'table' ? 'Employee Table' : 'Employee Grid'}
                        </h2>
                    </div>

                    <div className="p-6">
                        {viewMode === 'table' ? <TableView /> : <GridView />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEmployeeList;