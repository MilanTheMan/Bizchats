import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane } from "react-icons/fa";

const PersonalChannel = () => {
    const { channelId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelMessages(channelId).then((data) => setMessages(data.data));
    }, [channelId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        sqlService.createChannelMessage({ userId: user.id, channelId, content: newMessage }).then(() => {
            setMessages([...messages, { sender_name: user.name, content: newMessage, creation_date: new Date().toISOString() }]);
            setNewMessage("");
        });
    };

    return (
        <div className="bg-gray-100 min-h-[80vh] p-8">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                <div className="space-y-3">
                    {messages.map((msg, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                            <strong>{msg.sender_name}</strong>: {msg.content}
                            <p className="text-sm text-gray-500">{new Date(msg.creation_date).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <form className="mt-4 flex space-x-2" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                        <FaPaperPlane className="mr-2" /> Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalChannel;
