import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const { user } = useAuth();
    const [myBooks, setMyBooks] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('selling');

    useEffect(() => {
        const mockMyBooks = [
            {
                _id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                price: 250,
                condition: 'good',
                category: 'fiction',
                location: 'Mumbai',
                sellerName: user?.name || 'You',
                imageUrl: null,
                status: 'active'
            },
            {
                _id: '2',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                price: 180,
                condition: 'like-new',
                category: 'fiction',
                location: 'Mumbai',
                sellerName: user?.name || 'You',
                imageUrl: null,
                status: 'sold'
            }
        ];
        const mockPurchasedBooks = [
            {
                _id: '3',
                title: '1984',
                author: 'George Orwell',
                price: 120,
                condition: 'fair',
                category: 'fiction',
                location: 'Bangalore',
                sellerName: 'Mike Johnson',
                imageUrl: null,
                purchaseDate: '2024-01-15'
            }
        ];

        setMyBooks(mockMyBooks);
        setPurchasedBooks(mockPurchasedBooks);
    }, [user]);

    const getActiveBooks = () => myBooks.filter(book => book.status === 'active');
    const getSoldBooks = () => myBooks.filter(book => book.status === 'sold');

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
               
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-gray-600">
                        Manage your books and track your purchases
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                                <p className="text-2xl font-semibold text-gray-900">{getActiveBooks().length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Books Sold</p>
                                <p className="text-2xl font-semibold text-gray-900">{getSoldBooks().length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Books Purchased</p>
                                <p className="text-2xl font-semibold text-gray-900">{purchasedBooks.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-semibold text-gray-900">₹{getSoldBooks().reduce((sum, book) => sum + book.price, 0)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/add-book"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Book
                        </Link>
                        <Link
                            to="/profile"
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('selling')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'selling'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                My Books ({myBooks.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('purchased')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'purchased'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Purchased Books ({purchasedBooks.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'selling' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">My Books</h3>
                                    <Link
                                        to="/add-book"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Book
                                    </Link>
                                </div>

                                {myBooks.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No books listed yet</h3>
                                        <p className="text-gray-500 mb-4">Start selling your books to reach more readers</p>
                                        <Link
                                            to="/add-book"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Add Your First Book
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {myBooks.map(book => (
                                            <div key={book._id} className="relative">
                                                <BookCard book={book} />
                                                <div className="absolute top-2 left-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {book.status}
                                                    </span>
                                                </div>
                                                {book.status === 'active' && (
                                                    <div className="mt-2 flex space-x-2">
                                                        <Link
                                                            to={`/edit-book/${book._id}`}
                                                            className="flex-1 bg-yellow-600 text-white text-center py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-200 text-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'purchased' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Purchased Books</h3>
                                {purchasedBooks.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                                        <p className="text-gray-500 mb-4">Start exploring books to build your collection</p>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Browse Books
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {purchasedBooks.map(book => (
                                            <div key={book._id} className="relative">
                                                <BookCard book={book} />
                                                <div className="mt-2 text-center">
                                                    <span className="text-sm text-gray-500">
                                                        Purchased on {new Date(book.purchaseDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard