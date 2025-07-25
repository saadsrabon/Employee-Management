import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllWorkSheets, getAllEmployees } from '../../utils/api';
import { TrendingUp, Clock, Filter, BarChart3 } from 'lucide-react';

const Progress = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const { data: workSheets = [], isLoading: worksheetsLoading } = useQuery({
        queryKey: ['allWorkSheets'],
        queryFn: getAllWorkSheets
    });

    const { data: employees = [], isLoading: employeesLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: getAllEmployees
    });

    // Filter work sheets based on selected employee and month
    const filteredWorkSheets = workSheets.filter(ws => {
        const matchesEmployee = !selectedEmployee || ws.employeeEmail === selectedEmployee;
        const matchesMonth = !selectedMonth || new Date(ws.date).getMonth() === parseInt(selectedMonth);
        return matchesEmployee && matchesMonth;
    });

    // Calculate total hours for filtered data
    const totalHours = filteredWorkSheets.reduce((sum, ws) => sum + ws.hoursWorked, 0);

    const months = [
        { value: '0', label: 'January' },
        { value: '1', label: 'February' },
        { value: '2', label: 'March' },
        { value: '3', label: 'April' },
        { value: '4', label: 'May' },
        { value: '5', label: 'June' },
        { value: '6', label: 'July' },
        { value: '7', label: 'August' },
        { value: '8', label: 'September' },
        { value: '9', label: 'October' },
        { value: '10', label: 'November' },
        { value: '11', label: 'December' }
    ];

    const getEmployeeName = (email) => {
        const employee = employees.find(emp => emp.email === email);
        return employee ? employee.name : email;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Progress</h1>
                    <p className="text-gray-600">Monitor employee work progress and productivity</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Employee
                            </label>
                            <select
                                id="employee"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Employees</option>
                                {employees.map(employee => (
                                    <option key={employee.email} value={employee.email}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Month
                            </label>
                            <select
                                id="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Months</option>
                                {months.map(month => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Work Hours Summary</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center">
                                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-blue-600">Total Hours</p>
                                    <p className="text-2xl font-bold text-blue-900">{totalHours}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-green-600">Total Records</p>
                                    <p className="text-2xl font-bold text-green-900">{filteredWorkSheets.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                            <div className="flex items-center">
                                <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-purple-600">Average Hours</p>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {filteredWorkSheets.length > 0 ? (totalHours / filteredWorkSheets.length).toFixed(1) : '0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Records Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Work Records</h2>
                    </div>

                    {worksheetsLoading || employeesLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredWorkSheets.length === 0 ? (
                        <div className="text-center py-12">
                            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No work records found for the selected filters</p>
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
                                            Task
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hours Worked
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredWorkSheets.map((workSheet) => (
                                        <tr key={workSheet.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {getEmployeeName(workSheet.employeeEmail)}
                                                </div>
                                                <div className="text-sm text-gray-500">{workSheet.employeeEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {workSheet.task}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">{workSheet.hoursWorked} hours</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(workSheet.date).toLocaleDateString()}
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

export default Progress;