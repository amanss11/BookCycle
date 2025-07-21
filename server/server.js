// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

// App & Server Setup
const app = express();
const server = http.createServer(app); // Needed for Socket.IO

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Frontend URL
        methods: ['GET', 'POST'],
    },
});

// Make io available globally (optional but useful)
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('📚 BookCycle API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/conversations', conversationRoutes);

// Socket.IO Events
io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // Join a conversation room (by conversationId)
    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`📥 User ${socket.id} joined conversation ${conversationId}`);
        // List all sockets in the room for debug
        const room = io.sockets.adapter.rooms.get(conversationId);
        console.log(`Current sockets in room ${conversationId}:`, room ? Array.from(room) : []);
    });

    // Real-time message
    socket.on('sendMessage', (data) => {
        // data should include conversationId and message
        console.log(`➡️ Emitting message to room ${data.conversationId}:`, data.message);
        io.to(data.conversationId).emit('receiveMessage', data.message);
    });

    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
