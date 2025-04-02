import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaFileUpload, FaTimes } from "react-icons/fa";

const ChannelMessages = () => {
    const { channelId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const { user } = useContext(UserContext);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadMessages();
    }, [channelId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const loadMessages = async () => {
        try {
            const data = await sqlService.getChannelMessages(channelId);
            setMessages(data.data);
        } catch (err) {
            console.error("Failed to load messages:", err);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });

    const handleSendMessage = async (e) => {
        e.preventDefault();

        let file_url = null;

        try {
            if (file) {
                const fileType = file.type.split('/')[1];
                const base64 = await toBase64(file);
                const uploadResponse = await sqlService.uploadAttachment({
                    base64,
                    fileType,
                    folder: `channels/messages/${channelId}`
                });
                file_url = uploadResponse.file_url || uploadResponse.fileUrl;
            }

            if (!newMessage && !file_url) {
                alert("Please enter a message or attach a file.");
                return;
            }

            const messageData = {
                userId: user.id,
                channelId,
                content: newMessage || "",
                file_url
            };

            await sqlService.createChannelMessage(messageData);
            await loadMessages();

            setNewMessage("");
            setFile(null);
            setFilePreview(null);
        } catch (err) {
            console.error("Failed to send message:", err);
            alert("Failed to send message. Please try again.");
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setFilePreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    return (
        <div className="bg-gray-100 flex flex-col">
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => {
                    const fileUrl = msg.file_url || msg.file;
                    return (
                        <div key={i} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                            <strong>{msg.sender_name || 'Unknown'}</strong>:
                            {fileUrl && fileUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                                <img
                                    src={fileUrl}
                                    alt="Attachment"
                                    className="max-w-[300px] max-h-[300px] rounded-lg mb-2 object-contain"
                                />
                            ) : fileUrl ? (
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Attachment
                                </a>
                            ) : null}
                            {msg.content && <p>{msg.content}</p>}
                            <p className="text-sm text-gray-500">
                                {msg.creation_date
                                    ? new Date(msg.creation_date).toLocaleString()
                                    : "Unknown date"}
                            </p>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* File Preview */}
            {filePreview && (
                <div className="p-4 border-t bg-white flex items-center justify-start gap-4">
                    <div className="text-sm text-gray-600">Attachment Preview:</div>
                    <div className="relative">
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="max-w-[100px] max-h-[100px] rounded object-contain border"
                        />
                        <button
                            onClick={handleRemoveFile}
                            className="absolute top-0 right-0 bg-white border rounded-full p-1 text-red-600 hover:text-red-800"
                            title="Remove"
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                </div>
            )}

            {/* Input Form */}
            <form
                className="w-full flex items-center gap-2 p-4 border-t bg-white"
                style={{ marginBottom: "64px" }}
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <FaFileUpload className="text-blue-500" size={24} />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                    <FaPaperPlane className="mr-2" /> Send
                </button>
            </form>
        </div>
    );
};

export default ChannelMessages;
