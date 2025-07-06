import { useParams, Link } from 'react-router-dom'


function BookDetail(){
    const { id } = useParams()

    // Mock book data - will be replaced with API call
    const book = {
        id: id,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 299,
        condition: "Good",
        description: "A classic American novel about the Jazz Age and the American Dream. This copy is in good condition with minor wear on the cover.",
        category: "Fiction",
        location: "Mumbai, Maharashtra",
        seller: "John Doe",
        image: null
    }

    const handleBuyNow = () => {
        // This will redirect to login if user is not authenticated
        // For now, just log the action
        console.log('Buy Now clicked for book:', book.id)
    }

    return(
        <>
            <div className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                        ← Back to Home
                    </Link>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Book Image */}
                            <div>
                                {book.image ? (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                ) : (
                                    <div className="w-full h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Book Details */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

                                <div className="text-3xl font-bold text-green-600 mb-6">
                                    ₹{book.price}
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <span className="font-semibold text-gray-700">Condition:</span>
                                        <span className="ml-2 text-gray-600">{book.condition}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Category:</span>
                                        <span className="ml-2 text-gray-600">{book.category}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Location:</span>
                                        <span className="ml-2 text-gray-600">{book.location}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Seller:</span>
                                        <span className="ml-2 text-gray-600">{book.seller}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">Description:</h3>
                                    <p className="text-gray-600">{book.description}</p>
                                </div>
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BookDetail;