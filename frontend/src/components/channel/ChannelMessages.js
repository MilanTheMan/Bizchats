import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";

const ChannelMessages = () => {
    const { channelId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelMessages(channelId).then((data) => setMessages(data.data));
    }, [channelId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        let fileUrl = null;
        if (file) {
            const fileType = file.type.split('/')[1];
            const base64 = await toBase64(file);
            fileUrl = await sqlService.uploadAttachment({
                base64,
                fileType,
                folder: `channels/messages/${channelId}`
            });
        }

        sqlService.createChannelMessage({
            userId: user.id,
            channelId,
            content: newMessage,
            fileUrl
        }).then(() => {
            setMessages([...messages, {
                sender_name: user.name,
                content: newMessage,
                file_url: fileUrl,
                creation_date: new Date().toISOString()
            }]);
            setNewMessage("");
            setFile(null);
        });
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                        <strong>{msg.sender_name}</strong>: {msg.content}
                        {msg.file_url && (
                            <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Attachment
                            </a>
                        )}
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
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <FaFileUpload className="text-blue-500" size={24} />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                    <FaPaperPlane className="mr-2" /> Send
                </button>
            </form>
        </div>
    );
};

export default ChannelMessages;
