import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const BookFilter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        condition: '',
        priceRange: '',
        location: ''
    });

    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const cleared = {
            search: '',
            category: '',
            condition: '',
            priceRange: '',
            location: ''
        };
        setFilters(cleared);
        onFilterChange(cleared);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            {/* Search Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <FiSearch size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search books, authors, categories..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    className="px-5 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Filter Toggle Button */}
            <div className="mt-5">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="flex items-center text-gray-700 hover:text-black gap-2 text-sm"
                >
                    <FiFilter size={18} />
                    <span>Filters</span>
                    <svg
                        className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t pt-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Categories</option>
                            <option value="fiction">Fiction</option>
                            <option value="non-fiction">Non-Fiction</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                            <option value="biography">Biography</option>
                            <option value="self-help">Self-Help</option>
                            <option value="academic">Academic</option>
                        </select>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <select
                            value={filters.condition}
                            onChange={(e) => handleFilterChange('condition', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Conditions</option>
                            <option value="new">New</option>
                            <option value="like-new">Like New</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                        <select
                            value={filters.priceRange}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Prices</option>
                            <option value="0-100">Under ₹100</option>
                            <option value="100-300">₹100 - ₹300</option>
                            <option value="300-500">₹300 - ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                            <option value="1000+">Above ₹1000</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Locations</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chennai">Chennai</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="pune">Pune</option>
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
    );
};

export default BookFilter;
