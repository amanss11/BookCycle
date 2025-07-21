import { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function MyBooks() {
    const [books, setBooks] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const { data } = await API.get('/books/my');
                setBooks(data);
            } catch (err) {
                // eslint-disable-next-line
                console.error('Error fetching your books:', err.response?.data?.message || err.message);
            }
        };
        fetchMyBooks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await API.delete(`/books/${id}`);
            setBooks((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            // eslint-disable-next-line
            console.error(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">My Uploaded Books</h2>
            {books.length === 0 ? (
                    <p className="text-center text-gray-500">You haven’t added any books yet.</p>
            ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                            <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                                    {book.image ? (
                                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-16 h-16 text-gray-400 flex items-center justify-center">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-lg font-bold text-green-600">₹{book.sellingPrice}</span>
                                        <span className="text-sm text-gray-500">{book.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                        <span className="capitalize">{book.category}</span>
                                    </div>
                                    <div className="flex space-x-2 mt-auto">
                                        <button
                                            onClick={() => navigate(`/edit-book/${book._id}`)}
                                            className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBooks;
