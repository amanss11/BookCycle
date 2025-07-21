import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function ChatList() {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await API.get("/conversations");
                setConversations(data);
            } catch (err) {
                // eslint-disable-next-line
                console.error("Error fetching chats:", err.message);
            }
        };
        fetchChats();
    }, [user]);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Chats</h2>
                {!user ? <p className="text-center text-gray-500">Please log in to see your chats.</p> : conversations.length === 0 ? (
                    <p className="text-center text-gray-500">No chats yet.</p>
            ) : (
                    <div className="space-y-4">
                    {conversations.map((conv) => {
                            const otherUser = conv.participants.find((p) => p._id !== user._id);
                        return (
                                <div key={conv._id} className="bg-white rounded-lg shadow flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-gray-700">
                                            {otherUser?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800">{otherUser?.name || 'Unknown'}</span>
                                    </div>
                                    <Link to={`/chat/${conv._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">Open Chat</Link>
                                </div>
                        );
                    })}
                    </div>
            )}
            </div>
        </div>
    );
}

export default ChatList;
