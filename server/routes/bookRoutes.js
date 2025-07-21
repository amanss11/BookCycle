const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getMyBooks, getBookById, updateBook, deleteBook} = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/", protect, upload.single("image"), createBook);
router.get("/", getAllBooks);                // All books (public)
router.get("/my", protect, getMyBooks);      // User’s books
router.get("/:id", getBookById);
router.put("/:id", protect, upload.single("image"), updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
