import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    return (
        <header className="bg-gray-800 text-white shadow-md sticky top-0 z-30">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl font-bold text-white">BookCycle</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-white hover:text-blue-500 transition-colors">
                            Home
                        </Link>
                        {user && (
                            <>
                                <Link to="/my-books" className="text-gray-300 hover:text-white transition-colors">My Books</Link>
                                <Link to="/add-book" className="text-gray-300 hover:text-white transition-colors">Sell Book</Link>
                                <Link to="/chats" className="text-gray-300 hover:text-white transition-colors">Chats</Link>
                            </>
                        )}
                    </nav>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-700">
                                            {user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <span className="hidden md:block text-sm font-medium">{user?.name || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-white hover:text-blue-500 transition-colors">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex md:hidden items-center space-x-6">
                        <Link to="/" className="text-white hover:text-blue-500 transition-colors">
                            Home
                        </Link>
                        <Link to="/chats" className="text-gray-300 hover:text-white transition-colors">Chats</Link>
                        <button
                            className="ml-2 flex items-center justify-center w-10 h-10 text-white hover:text-blue-400"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <FiMenu size={24} />
                        </button>
                    </nav>
                </div>
            </div>
            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
                    <div className="bg-white w-64 h-full p-6 flex flex-col ml-auto">
                        <button className="self-end mb-6" onClick={() => setMobileMenuOpen(false)}>
                            <FiX size={28} />
                        </button>
                        {user && (
                            <>
                                {/* Username at the top */}
                                <div className="mb-6 flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-700">
                                            {user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-base font-semibold text-gray-800">{user?.name || 'User'}</span>
                                </div>
                                <Link to="/my-books" className="mb-4 text-gray-800" onClick={() => setMobileMenuOpen(false)}>My Books</Link>
                                <Link to="/add-book" className="mb-4 text-gray-800" onClick={() => setMobileMenuOpen(false)}>Sell Book</Link>
                                <div className="flex-1" />
                                <button
                                    onClick={handleLogout}
                                    className="mt-4 bg-red-100 text-red-700 font-semibold py-2 rounded-md hover:bg-red-200 transition-colors w-full"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && <>
                            <Link to="/login" className="mb-4 text-gray-800" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="mb-4 text-gray-800" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                        </>}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
