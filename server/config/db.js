// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database!");
    } 
    catch (err) {
        console.error(`MongoDB Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
