import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function EditBook() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            const { data } = await API.get(`/books/${id}`);
            setForm({
                title: data.title,
                mrp: data.mrp,
                sellingPrice: data.sellingPrice,
                location: data.location,
                category: data.category,
                educationType: data.educationType,
                image: null,
            });
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "image" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData();
        for (let key in form) {
            if (form[key]) formData.append(key, form[key]);
        }
        try {
        await API.put(`/books/${id}`, formData);
        navigate('/my-books');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    if (!form) return <p className="text-center text-gray-500 mt-8">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Book</h2>
                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Original MRP</label>
                            <input name="mrp" value={form.mrp} type="number" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Price</label>
                            <input name="sellingPrice" value={form.sellingPrice} type="number" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input name="location" value={form.location} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input name="category" value={form.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education Type</label>
                            <input name="educationType" value={form.educationType} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Image</label>
                        <input type="file" name="image" onChange={handleChange} className="w-full" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">Update Book</button>
        </form>
            </div>
        </div>
    );
}

export default EditBook;
