import React from 'react';
import { DollarSign, Calendar, CheckCircle, Clock, CreditCard } from 'lucide-react';

const Payroll = () => {
    // Mock data for design purposes
    const payrollRequests = [
        {
            id: 1,
            employeeName: "John Smith",
            employeeEmail: "john.smith@company.com",
            salary: 75000,
            month: "January",
            year: 2025,
            status: "pending",
            requestDate: "2025-01-25"
        },
        {
            id: 2,
            employeeName: "Sarah Johnson",
            employeeEmail: "sarah.johnson@company.com",
            salary: 65000,
            month: "January",
            year: 2025,
            status: "pending",
            requestDate: "2025-01-24"
        },
        {
            id: 3,
            employeeName: "Mike Davis",
            employeeEmail: "mike.davis@company.com",
            salary: 55000,
            month: "January",
            year: 2025,
            status: "pending",
            requestDate: "2025-01-23"
        },
        {
            id: 4,
            employeeName: "Emily Chen",
            employeeEmail: "emily.chen@company.com",
            salary: 68000,
            month: "December",
            year: 2024,
            status: "completed",
            requestDate: "2024-12-25",
            paymentDate: "2024-12-31"
        },
        {
            id: 5,
            employeeName: "Robert Wilson",
            employeeEmail: "robert.wilson@company.com",
            salary: 72000,
            month: "December",
            year: 2024,
            status: "completed",
            requestDate: "2024-12-24",
            paymentDate: "2024-12-31"
        },
        {
            id: 6,
            employeeName: "Lisa Anderson",
            employeeEmail: "lisa.anderson@company.com",
            salary: 58000,
            month: "December",
            year: 2024,
            status: "completed",
            requestDate: "2024-12-23",
            paymentDate: "2024-12-30"
        }
    ];

    const pendingRequests = payrollRequests.filter(req => req.status === 'pending');
    const completedRequests = payrollRequests.filter(req => req.status === 'completed');

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
                    <p className="text-gray-600">Process and approve employee salary payments</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-orange-100 p-3 rounded-full">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{completedRequests.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${pendingRequests.reduce((sum, req) => sum + req.salary, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <CreditCard className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Processed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${completedRequests.reduce((sum, req) => sum + req.salary, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Payments */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-orange-600" />
                            <span>Pending Payment Requests</span>
                        </h2>
                    </div>

                    {pendingRequests.length === 0 ? (
                        <div className="text-center py-12">
                            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No pending payment requests</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Salary
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Month/Year
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Request Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pendingRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                                                <div className="text-sm text-gray-500">{request.employeeEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                                                    <span className="text-sm font-medium text-green-600">
                                                        ${request.salary.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">
                                                        {request.month} {request.year}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(request.requestDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2">
                                                    <CreditCard className="h-4 w-4" />
                                                    <span>Pay</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Completed Payments */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span>Completed Payments</span>
                        </h2>
                    </div>

                    {completedRequests.length === 0 ? (
                        <div className="text-center py-12">
                            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No completed payments yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Salary
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Month/Year
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {completedRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                                                <div className="text-sm text-gray-500">{request.employeeEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                                                    <span className="text-sm font-medium text-green-600">
                                                        ${request.salary.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">
                                                        {request.month} {request.year}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(request.paymentDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payroll;