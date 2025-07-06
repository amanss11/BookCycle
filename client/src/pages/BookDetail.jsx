import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
useState

function BookDetail(){
    const { id } = useParams()

    // Mock book data - will be replaced with API call
    const books = [
        {
            id: '1',
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 299,
            condition: "Good",
            description: "A classic American novel about the Jazz Age and the American Dream. This copy is in good condition with minor wear on the cover.",
            category: "Fiction",
            location: "Mumbai, Maharashtra",
            seller: "John Doe",
            image: "https://m.media-amazon.com/images/I/81QuEGw8VPL._SL1500_.jpg"
        },
        {
            id: '2',
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 180,
            condition: "Like New",
            description: "A powerful story about justice and morality. This copy is in near-perfect condition, almost like new.",
            category: "Fiction",
            location: "Delhi, Delhi",
            seller: "Jane Smith",
            image: "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg"
        },
        {
            id: '3',
            title: "1984",
            author: "George Orwell",
            price: 120,
            condition: "Fair",
            description: "A dystopian novel depicting a totalitarian regime. The book shows signs of wear but is still readable.",
            category: "Fiction",
            location: "Bangalore, Karnataka",
            seller: "Mike Johnson",
            image: "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg"
        },
        {
            id: '4',
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            price: 350,
            condition: "Good",
            description: "A fantasy adventure tale. This paperback edition is in good shape with minor creases.",
            category: "Fiction",
            location: "Chennai, Tamil Nadu",
            seller: "Sarah Wilson",
            image: "https://m.media-amazon.com/images/I/712cDO7d73L._UF1000,1000_QL80_.jpg"
        },
        {
            id: '5',
            title: "Sapiens",
            author: "Yuval Noah Harari",
            price: 400,
            condition: "New",
            description: "An insightful look at human history. This copy is brand new and unopened.",
            category: "Non-Fiction",
            location: "Kolkata, West Bengal",
            seller: "David Brown",
            image: "https://m.media-amazon.com/images/I/713jIoMO3UL._UF1000,1000_QL80_.jpg"
        },
        {
            id: '6',
            title: "Atomic Habits",
            author: "James Clear",
            price: 280,
            condition: "Like New",
            description: "A guide to building better habits. Gently used, with no markings or damage.",
            category: "Self-Help",
            location: "Hyderabad, Telangana",
            seller: "Lisa Davis",
            image: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg"
        },
        {
            id: '7',
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 200,
            condition: "Good",
            description: "A philosophical story about following your dreams. Some pages slightly bent, otherwise clean.",
            category: "Fiction",
            location: "Pune, Maharashtra",
            seller: "Ankit Sharma",
            image: "https://m.media-amazon.com/images/I/617lxveUjYL.jpg"
        },
        {
            id: '8',
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            price: 150,
            condition: "Fair",
            description: "Personal finance lessons from two perspectives. Book is worn but readable.",
            category: "Self-Help",
            location: "Ahmedabad, Gujarat",
            seller: "Ritika Jain",
            image: "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg"
        },
        {
            id: '9',
            title: "A Brief History of Time",
            author: "Stephen Hawking",
            price: 320,
            condition: "Like New",
            description: "Explores complex physics in simple language. Lightly read and in excellent condition.",
            category: "Science",
            location: "Lucknow, Uttar Pradesh",
            seller: "Yash Patel",
            image: "https://m.media-amazon.com/images/I/81pQPZAFWbL.jpg"
        },
        {
            id: '10',
            title: "The Power of Habit",
            author: "Charles Duhigg",
            price: 260,
            condition: "Good",
            description: "Explains the science of habits. Minor signs of use, all pages intact.",
            category: "Self-Help",
            location: "Jaipur, Rajasthan",
            seller: "Priya Verma",
            image: "https://m.media-amazon.com/images/I/71ONWR6eXDL.jpg"
        },
        {
            id: '11',
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            price: 300,
            condition: "Excellent",
            description: "A psychology classic on decision-making. Like new with no damage.",
            category: "Non-Fiction",
            location: "Nagpur, Maharashtra",
            seller: "Rahul Mehta",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFECstqGox6cN058IZfjm6eivgkz_ZqUD9vQ&s"
        },
        {
            id: '12',
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            price: 190,
            condition: "Poor",
            description: "A story of teenage rebellion. Heavily used copy but still readable.",
            category: "Fiction",
            location: "Surat, Gujarat",
            seller: "Mira Kapoor",
            image: "https://m.media-amazon.com/images/I/8125BDk3l9L.jpg"
        },
        {
            id: '13',
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price: 220,
            condition: "Good",
            description: "A psychological thriller full of twists. Light wear on cover.",
            category: "Mystery",
            location: "Bhopal, Madhya Pradesh",
            seller: "Sneha Joshi",
            image: "https://m.media-amazon.com/images/I/81JJPDNlxSL._UF1000,1000_QL80_.jpg"
        },
        {
            id: '14',
            title: "Educated",
            author: "Tara Westover",
            price: 310,
            condition: "Excellent",
            description: "A memoir of perseverance and transformation. Great condition with no damage.",
            category: "Biography",
            location: "Noida, Uttar Pradesh",
            seller: "Neeraj Singh",
            image: "https://m.media-amazon.com/images/I/71-4MkLN5jL._UF1000,1000_QL80_.jpg"
        },
        {
            id: '15',
            title: "Ikigai",
            author: "Héctor García",
            price: 170,
            condition: "Fair",
            description: "A Japanese philosophy for a long, happy life. Mild wear on edges, still a good read.",
            category: "Self-Help",
            location: "Chandigarh, Chandigarh",
            seller: "Simran Kaur",
            image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
        }
    ];
      
    const book=books[id-1]

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