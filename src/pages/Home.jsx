import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    BarChart3,
    Users,
    TrendingUp,
    Shield,
    Star,
    ChevronRight,
    CheckCircle,
    Clock,
    DollarSign,
    FileText
} from 'lucide-react';

const Home = () => {
    const { currentUser } = useAuth();

    const services = [
        {
            icon: <Users className="h-12 w-12 text-blue-600" />,
            title: "Employee Management",
            description: "Comprehensive employee data management with role-based access control and verification systems."
        },
        {
            icon: <Clock className="h-12 w-12 text-blue-600" />,
            title: "Time Tracking",
            description: "Efficient work hour tracking with detailed reporting and analytics for better productivity insights."
        },
        {
            icon: <DollarSign className="h-12 w-12 text-blue-600" />,
            title: "Payroll Management",
            description: "Streamlined payroll processing with automated calculations and secure payment tracking."
        },
        {
            icon: <FileText className="h-12 w-12 text-blue-600" />,
            title: "Performance Analytics",
            description: "Advanced analytics and reporting tools to monitor employee performance and workflow efficiency."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "HR Director",
            image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150",
            content: "WorkFlow Pro has revolutionized how we manage our workforce. The intuitive interface and powerful features have saved us countless hours.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Operations Manager",
            image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
            content: "The real-time tracking and analytics have given us unprecedented insight into our team's productivity. Highly recommended!",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "CEO",
            image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=150",
            content: "Since implementing WorkFlow Pro, we've seen a 40% increase in operational efficiency. It's been a game-changer for our business.",
            rating: 5
        }
    ];

    const features = [
        "Real-time employee activity monitoring",
        "Automated payroll processing",
        "Role-based access control",
        "Performance analytics dashboard",
        "Secure data encryption",
        "Mobile-responsive design"
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Streamline Your Workforce Management
                            </h1>
                            <p className="text-xl text-blue-100">
                                Empower your team with our comprehensive employee management system. Track productivity, manage payroll, and optimize workflow efficiency all in one platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {currentUser ? (
                                    <Link
                                        to="/dashboard"
                                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <span>Go to Dashboard</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </Link>
                                ) : (
                                    <Link
                                        to="/register"
                                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <span>Get Started</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </Link>
                                )}
                                <Link
                                    to="/contact-us"
                                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                        <div className="text-2xl font-bold">98%</div>
                                        <div className="text-sm text-blue-100">Efficiency Boost</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                                        <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                        <div className="text-2xl font-bold">10K+</div>
                                        <div className="text-sm text-blue-100">Active Users</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                                        <Shield className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                        <div className="text-2xl font-bold">99.9%</div>
                                        <div className="text-sm text-blue-100">Uptime</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                        <div className="text-2xl font-bold">24/7</div>
                                        <div className="text-sm text-blue-100">Support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover how WorkFlow Pro can transform your business operations with our comprehensive suite of management tools.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="mb-6">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                Why Choose WorkFlow Pro?
                            </h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Team working together"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-xl text-gray-600">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Workforce?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of companies that trust WorkFlow Pro for their employee management needs
                    </p>
                    {!currentUser && (
                        <Link
                            to="/register"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                        >
                            <span>Start Your Free Trial</span>
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;