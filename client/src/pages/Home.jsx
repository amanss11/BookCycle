import React, { useState, useEffect } from 'react';
import BookFilter from '../components/books/BookFilter';
import BookCard from '../components/books/BookCard';

function Home() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data - replace with API call
    useEffect(() => {
        const mockBooks = [
            {
                _id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                price: 250,
                condition: 'good',
                category: 'fiction',
                location: 'Mumbai',
                sellerName: 'John Doe',
                imageUrl: "https://m.media-amazon.com/images/I/81QuEGw8VPL._SL1500_.jpg"
            },
            {
                _id: '2',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                price: 180,
                condition: 'like-new',
                category: 'fiction',
                location: 'Delhi',
                sellerName: 'Jane Smith',
                imageUrl: "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg"
            },
            {
                _id: '3',
                title: '1984',
                author: 'George Orwell',
                price: 120,
                condition: 'fair',
                category: 'fiction',
                location: 'Bangalore',
                sellerName: 'Mike Johnson',
                imageUrl: "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '4',
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                price: 350,
                condition: 'good',
                category: 'fiction',
                location: 'Chennai',
                sellerName: 'Sarah Wilson',
                imageUrl: "https://m.media-amazon.com/images/I/712cDO7d73L._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '5',
                title: 'Sapiens',
                author: 'Yuval Noah Harari',
                price: 400,
                condition: 'new',
                category: 'non-fiction',
                location: 'Kolkata',
                sellerName: 'David Brown',
                imageUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '6',
                title: 'Atomic Habits',
                author: 'James Clear',
                price: 280,
                condition: 'like-new',
                category: 'self-help',
                location: 'Hyderabad',
                sellerName: 'Lisa Davis',
                imageUrl: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg"
            },
            {
                _id: '7',
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                price: 200,
                condition: 'good',
                category: 'fiction',
                location: 'Pune',
                sellerName: 'Ankit Sharma',
                imageUrl: "https://m.media-amazon.com/images/I/617lxveUjYL.jpg"
            },
            {
                _id: '8',
                title: 'Rich Dad Poor Dad',
                author: 'Robert Kiyosaki',
                price: 150,
                condition: 'fair',
                category: 'self-help',
                location: 'Ahmedabad',
                sellerName: 'Ritika Jain',
                imageUrl: "https://m.media-amazon.com/images/I/81BE7eeKzAL._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '9',
                title: 'A Brief History of Time',
                author: 'Stephen Hawking',
                price: 320,
                condition: 'like-new',
                category: 'science',
                location: 'Lucknow',
                sellerName: 'Yash Patel',
                imageUrl: "https://m.media-amazon.com/images/I/81pQPZAFWbL.jpg"
            },
            {
                _id: '10',
                title: 'The Power of Habit',
                author: 'Charles Duhigg',
                price: 260,
                condition: 'good',
                category: 'self-help',
                location: 'Jaipur',
                sellerName: 'Priya Verma',
                imageUrl: "https://m.media-amazon.com/images/I/71ONWR6eXDL.jpg"
            },
            {
                _id: '11',
                title: 'Thinking, Fast and Slow',
                author: 'Daniel Kahneman',
                price: 300,
                condition: 'excellent',
                category: 'non-fiction',
                location: 'Nagpur',
                sellerName: 'Rahul Mehta',
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFECstqGox6cN058IZfjm6eivgkz_ZqUD9vQ&s"
            },
            {
                _id: '12',
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                price: 190,
                condition: 'poor',
                category: 'fiction',
                location: 'Surat',
                sellerName: 'Mira Kapoor',
                imageUrl: "https://m.media-amazon.com/images/I/8125BDk3l9L.jpg"
            },
            {
                _id: '13',
                title: 'The Silent Patient',
                author: 'Alex Michaelides',
                price: 220,
                condition: 'good',
                category: 'mystery',
                location: 'Bhopal',
                sellerName: 'Sneha Joshi',
                imageUrl: "https://m.media-amazon.com/images/I/81JJPDNlxSL._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '14',
                title: 'Educated',
                author: 'Tara Westover',
                price: 310,
                condition: 'excellent',
                category: 'biography',
                location: 'Noida',
                sellerName: 'Neeraj Singh',
                imageUrl: "https://m.media-amazon.com/images/I/71-4MkLN5jL._UF1000,1000_QL80_.jpg"
            },
            {
                _id: '15',
                title: 'Ikigai',
                author: 'Héctor García',
                price: 170,
                condition: 'fair',
                category: 'self-help',
                location: 'Chandigarh',
                sellerName: 'Simran Kaur',
                imageUrl: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
            }
        ];
          

        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
        setLoading(false);
        
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = [...books];
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(book => book.category === filters.category);
        }

        // Condition filter
        if (filters.condition) {
            filtered = filtered.filter(book => book.condition === filters.condition);
        }

        // Price range filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(book => {
                if (max) {
                    return book.price >= min && book.price <= max;
                } else {
                    return book.price >= min;
                }
            });
        }

        if (filters.location) {
            filtered = filtered.filter(book =>
                book.location.toLowerCase() === filters.location.toLowerCase()
            );
        }

        setFilteredBooks(filtered);
    };

    if (loading) {
        return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        );
    }
    
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Find Your Next Great Read
                        </h1>
                        <p className="text-xl text-gray-600">
                            Discover thousands of second-hand books from readers like you
                        </p>
                    </div>

                    <BookFilter onFilterChange={handleFilterChange} />

                    <div className="mb-6">
                        <h2 className="text- font-semibold text-gray-900 mb-4">
                            Available Books ({filteredBooks.length})
                        </h2>
                    </div>

                    {filteredBooks.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map(book => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;