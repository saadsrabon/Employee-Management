import React from 'react';
import { BarChart3, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold">WorkFlow Pro</span>
                        </div>
                        <p className="text-gray-300">
                            Empowering teams with efficient workflow management and employee monitoring solutions.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                            <li><a href="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><span className="text-gray-300">Employee Management</span></li>
                            <li><span className="text-gray-300">Payroll Processing</span></li>
                            <li><span className="text-gray-300">Performance Tracking</span></li>
                            <li><span className="text-gray-300">HR Analytics</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300">123 Business Street, City, State 12345</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-300">info@workflowpro.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-300">
                        © 2024 WorkFlow Pro. All rights reserved. Built with React and Tailwind CSS.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;