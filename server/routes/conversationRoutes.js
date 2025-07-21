const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createOrGetConversation,
  getConversations,
  getMessages,
  sendMessage,
} = require("../controllers/messageController");

const router = express.Router();

// Create or get a conversation with another user
router.post("/", protect, createOrGetConversation);
// List all conversations for the logged-in user
router.get("/", protect, getConversations);
// Get all messages in a conversation
router.get("/:id/messages", protect, getMessages);
// Send a message in a conversation
router.post("/:id/messages", protect, sendMessage);

module.exports = router; 