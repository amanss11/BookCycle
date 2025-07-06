import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditBook = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        condition: '',
        category: '',
        description: '',
        location: '',
        image: null
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [error, setError] = useState('')

    // Mock book data - will be replaced with API call
    const mockBook = {
        id: id,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 299,
        condition: 'Good',
        category: 'Fiction',
        description: 'A classic American novel about the Jazz Age and the American Dream. This copy is in good condition with minor wear on the cover.',
        location: 'Mumbai, Maharashtra',
        image: null
    }

    useEffect(() => {
        const loadBook = async () => {
            try {
                // TODO: Replace with actual API call
                // const book = await bookService.getBook(id)

                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500))

                setFormData({
                    title: mockBook.title,
                    author: mockBook.author,
                    price: mockBook.price,
                    condition: mockBook.condition,
                    category: mockBook.category,
                    description: mockBook.description,
                    location: mockBook.location,
                    image: null
                })

                setImagePreview(mockBook.image)
            } catch (error) {
                setError('Failed to load book details')
            } finally {
                setInitialLoading(false)
            }
        }

        loadBook()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }))

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Basic validation
        if (!formData.title.trim() || !formData.author.trim() || !formData.price) {
            setError('Please fill in all required fields')
            setLoading(false)
            return
        }

        if (formData.price <= 0) {
            setError('Price must be greater than 0')
            setLoading(false)
            return
        }

        try {
            // TODO: Replace with actual API call
            // const result = await bookService.updateBook(id, formData)

            // Mock success response
            console.log('Updating book:', { id, ...formData })

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirect to dashboard
            navigate('/dashboard', {
                state: { message: 'Book updated successfully!' }
            })
        } catch (error) {
            setError('Failed to update book. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            return
        }

        setLoading(true)
        try {
            // TODO: Replace with actual API call
            // await bookService.deleteBook(id)

            // Mock success response
            console.log('Deleting book:', id)

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500))

            // Redirect to dashboard
            navigate('/dashboard', {
                state: { message: 'Book deleted successfully!' }
            })
        } catch (error) {
            setError('Failed to delete book. Please try again.')
            setLoading(false)
        }
    }

    if (initialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error && !formData.title) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
                    <p className="text-gray-600 mb-4">The book you're looking for doesn't exist or you don't have permission to edit it.</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
                        >
                            ← Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
                        <p className="text-gray-600 mt-2">
                            Update your book listing information.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Book Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Book Cover Image
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            disabled={loading}
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="w-20 h-28 border rounded-md overflow-hidden">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Book Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter book title"
                                    disabled={loading}
                                />
                            </div>

                            {/* Author */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter author name"
                                    disabled={loading}
                                />
                            </div>

                            {/* Price and Condition */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter price"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition *
                                    </label>
                                    <select
                                        id="condition"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={loading}
                                    >
                                        <option value="">Select condition</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>

                            {/* Category and Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={loading}
                                    >
                                        <option value="">Select category</option>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Non-Fiction">Non-Fiction</option>
                                        <option value="Science Fiction">Science Fiction</option>
                                        <option value="Mystery">Mystery</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Biography">Biography</option>
                                        <option value="History">History</option>
                                        <option value="Self-Help">Self-Help</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Children">Children</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your city, state"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Describe the book's condition, any notes, etc."
                                    disabled={loading}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Deleting...' : 'Delete Book'}
                                </button>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/dashboard')}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Updating...' : 'Update Book'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBook