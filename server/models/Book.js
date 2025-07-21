const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String // Cloudinary image URL
    },
    category: {
        type: String, // e.g. Novel, Reference, etc.
        required: true
    },
    educationType: {
        type: String, // e.g. Engineering, Medical, Commerce, etc.
        
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
