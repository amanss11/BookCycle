import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { FiArrowLeft, FiSmile } from 'react-icons/fi';

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

function Chat() {
    const { conversationId } = useParams();
    const { user } = useContext(AuthContext);
    const socket = useSocket();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [otherUser, setOtherUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (!socket || !conversationId) return;
        socket.emit('joinConversation', conversationId);
    }, [conversationId, socket]);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const { data } = await API.get(`/conversations/${conversationId}/messages`);
            setMessages(data);
            setLoading(false);
        };
        const fetchOtherUser = async () => {
            const { data } = await API.get(`/conversations`);
            const conv = data.find((c) => c._id === conversationId);
            if (conv) {
                setOtherUser(conv.participants.find((p) => p._id !== user._id));
            }
        };
        if (conversationId) {
        fetchMessages();
            fetchOtherUser();
        }
    }, [conversationId, user]);

    useEffect(() => {
        if (!socket || !conversationId) return;
        const handleReceive = (msg) => {
                setMessages((prev) => {
                    if (prev.some((m) => m._id === msg._id)) return prev;
                    return [...prev, msg];
                });
        };
        socket.on('receiveMessage', handleReceive);
        return () => socket.off('receiveMessage', handleReceive);
    }, [socket, conversationId]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!socket || !text.trim()) return;
        const payload = { text };
        const { data } = await API.post(`/conversations/${conversationId}/messages`, payload);
        setMessages((prev) => prev.some((m) => m._id === data._id) ? prev : [...prev, data]);
        socket.emit('sendMessage', {
            conversationId,
            message: data,
        });
        setText('');
    };

    // Group messages by date and sender
    const groupedMessages = [];
    let lastDate = null;
    let lastSender = null;
    messages.forEach((msg, idx) => {
        const msgDate = formatDate(msg.createdAt);
        const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
        const isMe = senderId && senderId.toString() === user._id.toString();
        if (msgDate !== lastDate) {
            groupedMessages.push({ type: 'date', date: msgDate, key: `date-${msgDate}-${idx}` });
            lastDate = msgDate;
            lastSender = null;
        }
        if (senderId !== lastSender) {
            groupedMessages.push({ type: 'bubble', msg, isMe, firstOfGroup: true, key: msg._id });
            lastSender = senderId;
        } else {
            groupedMessages.push({ type: 'bubble', msg, isMe, firstOfGroup: false, key: msg._id });
        }
    });

    return (
        <div className="bg-gray-100 min-h-screen py-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow w-full max-w-2xl flex flex-col h-[80vh] border border-gray-200">
                {/* Header */}
                <div className="px-4 py-3 border-b flex items-center gap-4 bg-white rounded-t-xl sticky top-0 z-10 shadow-sm">
                    {/* Back button on mobile */}
                    <button
                        className="md:hidden flex items-center justify-center w-10 h-10 text-gray-500 hover:text-blue-600"
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                    >
                        <FiArrowLeft size={22} />
                    </button>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
                        {otherUser?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <span className="text-lg font-semibold text-gray-800">{otherUser ? otherUser.name : 'Chat'}</span>
                        {/* Optionally, online status here */}
                    </div>
                </div>
                {/* Messages */}
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-2 bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : groupedMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <span className="text-4xl mb-2">💬</span>
                            <span>No messages yet. Start the conversation!</span>
                        </div>
                    ) : (
                        groupedMessages.map((item, idx) => {
                            if (item.type === 'date') {
                                return (
                                    <div key={item.key} className="flex justify-center my-2">
                                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                                            {item.date}
                                        </span>
                                    </div>
                                );
                            }
                            const { msg, isMe, firstOfGroup } = item;
                            return (
                                <div
                                    key={item.key}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[75%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                        {/* Avatar for other user only, and only on first of group */}
                                        {!isMe && firstOfGroup && (
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-base font-bold text-gray-700">
                                                {otherUser?.name?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <div className={`px-4 py-2 rounded-2xl text-sm break-words shadow-sm transition-all duration-150 ${isMe ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-200 text-gray-900 rounded-bl-md'} ${firstOfGroup ? 'mt-2' : 'mt-0'}`}>
                                            <span>{msg.text}</span>
                                            <div className="text-xs text-gray-400 mt-1 text-right">
                                                {formatTime(msg.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
            </div>
                {/* Input */}
                <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t bg-white rounded-b-xl sticky bottom-0">
                    {/* Emoji picker placeholder */}
                    <button
                        type="button"
                        className="text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
                        tabIndex={-1}
                        aria-label="Emoji picker (coming soon)"
                        disabled
                    >
                        <FiSmile size={22} />
                    </button>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                        placeholder="Type your message..."
                    required
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        aria-label="Type your message"
                />
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Send
                    </button>
            </form>
            </div>
        </div>
    );
}

export default Chat;

// Add fade-in animation
// In your global CSS (e.g., index.css or tailwind config):
// .animate-fadeIn { animation: fadeIn 0.3s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
