const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

// Create or get a conversation between two users
exports.createOrGetConversation = async (req, res) => {
    const { participantId } = req.body;
    const userId = req.user._id;
    if (!participantId || participantId === userId.toString()) {
        return res.status(400).json({ message: "Invalid participant" });
    }
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, participantId], $size: 2 },
        });
        if (!conversation) {
            conversation = await Conversation.create({ participants: [userId, participantId] });
        }
        res.json(conversation);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all conversations for the logged-in user
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({ participants: userId })
            .sort({ updatedAt: -1 })
            .populate({
                path: "participants",
                select: "name email",
        });
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all messages in a conversation
exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const conversation = await Conversation.findById(id);
        if (!conversation || !conversation.participants.includes(userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const messages = await Message.find({ conversation: id })
            .sort({ createdAt: 1 })
            .populate("sender", "name");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Send a message in a conversation and emit real-time
exports.sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user._id;
        const conversation = await Conversation.findById(id);
        if (!conversation || !conversation.participants.includes(userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }
        let message = await Message.create({
            conversation: id,
            sender: userId,
            text,
        });
        message = await message.populate('sender', 'name');
        conversation.updatedAt = new Date();
        await conversation.save();
        // Emit real-time message
        const io = req.app.get('io');
        if (io) {
            io.to(id).emit('receiveMessage', message);
        }
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
