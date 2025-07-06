import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
    };

    return (
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 m-2">
            <div className="relative h-48 bg-gray-100">
                {book.imageUrl ? (
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                ) : null}
                <div
                    className={`w-full h-full flex items-center justify-center ${book.imageUrl ? 'hidden' : 'block'
                        }`}
                >
                    <svg
                        className="w-16 h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.condition === 'new' ? 'bg-green-100 text-green-800' :
                            book.condition === 'like-new' ? 'bg-blue-100 text-blue-800' :
                                book.condition === 'good' ? 'bg-yellow-100 text-yellow-800' :
                                    book.condition === 'fair' ? 'bg-orange-100 text-orange-800' :
                                        'bg-red-100 text-red-800'
                        }`}>
                        {book.condition}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">₹{book.price}</span>
                    <span className="text-sm text-gray-500">{book.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="capitalize">{book.category}</span>
                    <span>{book.sellerName}</span>
                </div>

                <div className="flex space-x-2">
                    <Link
                        to={`/book/${book._id}`}
                        className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        View Details
                    </Link>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;