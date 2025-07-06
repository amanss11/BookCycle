import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <span className="text-xl font-bold">BookCycle</span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            The best marketplace for buying and selling second-hand books.
                            Connect with fellow book lovers and discover amazing reads.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>Email: support@bookcycle.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Book Street, Reading City</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 BookCycle. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;