import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import EmployeeList from './hr/EmployeeList'
import {
    Users,
    FileText,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    BarChart3
} from 'lucide-react';

const Dashboard = () => {
    const { currentUser, userRole } = useAuth();

    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const employeeLinks = [
        {
            title: 'Work Sheet',
            description: 'Track your daily tasks and work hours',
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            link: '/work-sheet',
            color: 'bg-blue-50 hover:bg-blue-100'
        },
        {
            title: 'Payment History',
            description: 'View your salary payment records',
            icon: <DollarSign className="h-8 w-8 text-green-600" />,
            link: '/payment-history',
            color: 'bg-green-50 hover:bg-green-100'
        }
    ];

    const hrLinks = [
        {
            title: 'Employee List',
            description: 'Manage all employees and their details',
            icon: <Users className="h-8 w-8 text-purple-600" />,
            link: '/employee-list',
            color: 'bg-purple-50 hover:bg-purple-100'
        },
        {
            title: 'Progress Tracking',
            description: 'Monitor employee work progress',
            icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
            link: '/progress',
            color: 'bg-indigo-50 hover:bg-indigo-100'
        }
    ];

    const adminLinks = [
        {
            title: 'All Employees',
            description: 'Manage all employees and HR staff',
            icon: <Users className="h-8 w-8 text-red-600" />,
            link: '/all-employee-list',
            color: 'bg-red-50 hover:bg-red-100'
        },
        {
            title: 'Payroll Management',
            description: 'Process and approve salary payments',
            icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
            link: '/payroll',
            color: 'bg-yellow-50 hover:bg-yellow-100'
        }
    ];

    const getQuickActions = () => {
        switch (userRole) {
            case 'employee':
                return employeeLinks;
            case 'hr':
                return hrLinks;
            case 'admin':
                return adminLinks;
            default:
                return [];
        }
    };

    const getStats = () => {
        const baseStats = [
            {
                title: 'Total Hours',
                value: '160',
                change: '+12%',
                icon: <Clock className="h-6 w-6 text-blue-600" />,
                color: 'text-blue-600'
            },
            {
                title: 'Tasks Completed',
                value: '24',
                change: '+8%',
                icon: <CheckCircle className="h-6 w-6 text-green-600" />,
                color: 'text-green-600'
            },
            {
                title: 'Pending Tasks',
                value: '3',
                change: '-5%',
                icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
                color: 'text-orange-600'
            },
            {
                title: 'Performance',
                value: '95%',
                change: '+3%',
                icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
                color: 'text-purple-600'
            }
        ];

        if (userRole === 'hr') {
            return [
                {
                    title: 'Total Employees',
                    value: '45',
                    change: '+5%',
                    icon: <Users className="h-6 w-6 text-blue-600" />,
                    color: 'text-blue-600'
                },
                {
                    title: 'Active Projects',
                    value: '12',
                    change: '+2%',
                    icon: <FileText className="h-6 w-6 text-green-600" />,
                    color: 'text-green-600'
                },
                {
                    title: 'Pending Approvals',
                    value: '8',
                    change: '-3%',
                    icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
                    color: 'text-orange-600'
                },
                {
                    title: 'Department Performance',
                    value: '87%',
                    change: '+4%',
                    icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
                    color: 'text-purple-600'
                }
            ];
        }

        if (userRole === 'admin') {
            return [
                {
                    title: 'Total Users',
                    value: '156',
                    change: '+8%',
                    icon: <Users className="h-6 w-6 text-blue-600" />,
                    color: 'text-blue-600'
                },
                {
                    title: 'Monthly Payroll',
                    value: '$125K',
                    change: '+6%',
                    icon: <DollarSign className="h-6 w-6 text-green-600" />,
                    color: 'text-green-600'
                },
                {
                    title: 'System Alerts',
                    value: '2',
                    change: '-1%',
                    icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
                    color: 'text-orange-600'
                },
                {
                    title: 'Overall Performance',
                    value: '92%',
                    change: '+7%',
                    icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
                    color: 'text-purple-600'
                }
            ];
        }

        return baseStats;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {getWelcomeMessage()}, {currentUser?.displayName || currentUser?.email}!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Welcome to your {userRole} dashboard. Here's what's happening today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {getStats().map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    {stat.icon}
                                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getQuickActions().map((action, index) => (
                            <Link
                                key={index}
                                to={action.link}
                                className={`${action.color} p-6 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 transform hover:scale-105`}
                            >
                                <div className="flex items-center space-x-4">
                                    {action.icon}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                                        <p className="text-gray-600 text-sm">{action.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <EmployeeList/>
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Task completed: Project Review</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">New work sheet submitted</p>
                                <p className="text-xs text-gray-500">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <DollarSign className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Salary payment processed</p>
                                <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;