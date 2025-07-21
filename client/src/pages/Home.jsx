import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiBookOpen } from 'react-icons/fi';

const categories = [
    '', 'Programming', 'Medical', 'Fiction', 'Non-fiction', 'Self-help', 'Science', 'Biography', 'Mystery', 'Reference', 'Other'
];
const locations = [
    '', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Lucknow', 'Jaipur', 'Other'
];

function Home() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        category: '',
    });
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const { data } = await API.get('/books');
                setBooks(data);
                setFilteredBooks(data);
            } catch (err) {
                console.error('Error fetching books:', err.response?.data?.message || err.message);
            }
            setLoading(false);
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        let temp = [...books];
        if (filters.search)
            temp = temp.filter((book) =>
                book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                (book.createdBy?.name || '').toLowerCase().includes(filters.search.toLowerCase())
            );
        if (filters.location)
            temp = temp.filter((book) => book.location.toLowerCase() === filters.location.toLowerCase());
        if (filters.category)
            temp = temp.filter((book) => book.category.toLowerCase() === filters.category.toLowerCase());
        setFilteredBooks(temp);
    }, [filters, books]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        // Filtering is already reactive, so just prevent default
    };
    const clearFilters = () => {
        setFilters({ search: '', location: '', category: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-8">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">All Books</h2>
                {/* BookFilter Bar */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-8">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex flex-col gap-2 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <FiSearch size={18} />
                            </span>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search books, authors, categories..."
                                value={filters.search}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-t-md md:rounded-l-md md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowFilters((prev) => !prev)}
                            className="flex items-center justify-center w-full md:w-auto px-5 py-2 bg-gray-200 text-gray-700 rounded-b-md md:rounded-r-md md:rounded-b-none hover:bg-gray-300 transition text-base font-medium"
                        >
                            <FiFilter size={20} />
                            <span className="ml-2">Filters</span>
                            <svg
                                className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </form>
                    {/* Filter Options */}
                    {showFilters && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
                                >
                                    <option value="">All Categories</option>
                                    {categories.filter(Boolean).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <select
                                    name="location"
                                    value={filters.location}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
                                >
                                    <option value="">All Locations</option>
                                    {locations.filter(Boolean).map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {/* Clear Button */}
                    {showFilters && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <FiBookOpen className="text-6xl mb-2" />
                        <span className="text-lg">No books found. Try adjusting your search or filters!</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BookCard({ book }) {
    return (
        <Link
            to={`/book/${book._id}`}
            className="group bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-200 flex flex-col overflow-hidden animate-fadeIn focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[340px] md:min-h-[400px]"
            tabIndex={0}
        >
            <div className="aspect-w-3 aspect-h-5 w-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {book.image ? (
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                ) : (
                    <div className="w-16 h-16 text-gray-400 flex items-center justify-center">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">by {book.author || book.createdBy?.name || 'Unknown'}</p>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-green-600">₹{book.sellingPrice || book.price}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{book.location}</span>
                </div>
                <span className="sr-only">View details for {book.title}</span>
                <span className="mt-auto bg-blue-600 text-white text-center py-2 px-4 rounded-md group-hover:bg-blue-700 transition-colors duration-200 font-semibold shadow focus:bg-blue-700 focus:outline-none">View Details</span>
            </div>
        </Link>
    );
}

export default Home;
