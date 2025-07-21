import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddBook() {
    const [form, setForm] = useState({
        title: '',
        mrp: '',
        sellingPrice: '',
        location: '',
        category: '',
        educationType: '',
        image: null,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }
            const { data } = await API.post('/books', formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Add book failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a Book</h2>
                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input name="title" placeholder="Book Title" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Original MRP</label>
                            <input name="mrp" type="number" placeholder="Original MRP" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Price</label>
                            <input name="sellingPrice" type="number" placeholder="Your Price" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input name="location" placeholder="Location" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input name="category" placeholder="Category (e.g. Programming, Medical)" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education Type</label>
                            <input name="educationType" placeholder="Education Type (Engineering, Medical, etc.)" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Image</label>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">Add Book</button>
        </form>
            </div>
        </div>
    );
}

export default AddBook;
