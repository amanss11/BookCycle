const Book = require("../models/Book");


const createBook = async (req, res) => {
    const { title, mrp, sellingPrice, location, category, educationType } = req.body;

    if (!title || !mrp || !sellingPrice || !location || !category || !educationType) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    const image = req.file ? req.file.path : "";
    try{
        const book = await Book.create({
            title,
            mrp,
            sellingPrice,
            location,
            category,
            educationType,
            image,
            createdBy: req.user._id
        });

        res.status(201).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Server error", error: err.message });    }
    
};



const getAllBooks = async (req, res) => {
    const books = await Book.find().populate("createdBy", "name email");
    res.json(books);
};


const getMyBooks = async (req, res) => {
    const books = await Book.find({ createdBy: req.user._id });
    res.json(books);
};


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("createdBy", "name email");
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(book);
    } catch (err) {
        console.error("Error fetching book:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.createdBy.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        const updatedFields = req.body;

        if (req.file) {
            updatedFields.image = req.file.path;
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedFields, {
            new: true,
        });

        res.status(200).json(updatedBook);
    } catch (err) {
        console.error("Error updating book:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.createdBy.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        await book.deleteOne();

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error("Error deleting book:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    createBook,
    getAllBooks,
    getMyBooks,
    getBookById,
    updateBook,
    deleteBook
};

