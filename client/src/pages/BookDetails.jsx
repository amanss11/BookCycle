import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await API.get(`/books/${id}`);
                setBook(data);
            } catch (err) {
                console.error('Error fetching book:', err.response?.data?.message || err.message);
            }
        };
        fetchBook();
    }, [id]);

    const handleMessageSeller = async () => {
        if (!user) {
            navigate('/register');
            return;
        }
        try {
            const { data } = await API.post('/conversations', { participantId: book.createdBy._id });
            navigate(`/chat/${data._id}`);
        } catch (err) {
            console.error('Error starting chat:', err.response?.data?.message || err.message);
        }
    };

    if (!book) return <p className="text-center text-gray-500 mt-8">Loading book...</p>;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 w-full md:w-72 h-72 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
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
                <div className="flex-1 flex flex-col justify-between">
        <div>
                        <Link to="/" className="text-blue-500 hover:underline text-sm">← Back to all books</Link>
                        <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{book.title}</h2>
                        <div className="mb-2 text-gray-700">{book.author && <span>by {book.author}</span>}</div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-bold text-green-600">₹{book.sellingPrice || book.price}</span>
                            <span className="text-sm text-gray-500">MRP: ₹{book.mrp}</span>
                        </div>
                        <div className="mb-2 text-gray-700">Location: <span className="font-medium">{book.location}</span></div>
                        <div className="mb-2 text-gray-700">Category: <span className="font-medium">{book.category}</span></div>
                        <div className="mb-2 text-gray-700">Education Type: <span className="font-medium">{book.educationType}</span></div>
                        <div className="mb-2 text-gray-700">Uploaded by: <span className="font-medium">{book.createdBy?.name || 'Unknown'}</span></div>
                    </div>
                    <button
                        onClick={handleMessageSeller}
                        className="mt-6 w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold shadow"
                    >
                        Message Seller
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
