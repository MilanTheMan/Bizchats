import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaFileUpload, FaCog } from "react-icons/fa";

const PersonalChannel = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const { user } = useContext(UserContext);
    const bottomRef = useRef(null);

    const reloadMessages = async () => {
        const data = await sqlService.getChannelMessages(channelId);
        setMessages(data.data);
    };

    useEffect(() => {
        sqlService.getChannelById(channelId).then((data) => setChannel(data.data));
        reloadMessages();
    }, [channelId]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                    folder: `messages/personal/${channelId}`
                });
                file_url = uploadResponse.file_url;
                console.log("Uploaded file URL:", file_url);
            }

            if (!newMessage && !file) {
                alert("Please enter a message or attach a file.");
                return;
            }

            const messageData = {
                userId: user.id,
                channelId,
                content: newMessage || "",
                file_url: file_url
            };

            console.log("Sending message data:", messageData);

            await sqlService.createChannelMessage(messageData);
            await reloadMessages();

            setNewMessage("");
            setFile(null);
            setFilePreview(null);
        } catch (err) {
            console.error("Failed to send message:", err);
            alert("Failed to send message. Please try again.");
        }
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
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

    if (!channel) {
        return <div className="text-center text-gray-600 text-lg">Loading channel...</div>;
    }

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col">
            {/* Channel Banner */}
            <div className="channel-banner relative">
                <img
                    src={channel.profile_picture}
                    alt={`${channel.name} Banner`}
                    className="channel-banner-image"
                />
                <div className="channel-banner-overlay">
                    <h1 className="channel-name">{channel.name}</h1>
                </div>
                <button
                    onClick={() => navigate(`/channel/${channelId}/settings`)}
                    className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition"
                    title="Settings"
                >
                    <FaCog size={20} />
                </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                        <strong>{msg.sender_name}</strong>:
                        {msg.file_url && typeof msg.file_url === "string" && msg.file_url.match(/\.(png|jpg|jpeg|webp)$/i) ? (
                            <img
                                src={msg.file_url}
                                alt="Attachment"
                                className="max-w-[300px] max-h-[300px] rounded-lg mb-2 object-contain"
                            />
                        ) : msg.file_url && typeof msg.file_url === "string" ? (
                            <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Attachment
                            </a>
                        ) : null}
                        {msg.content && <p>{msg.content}</p>}
                        <p className="text-sm text-gray-500">{new Date(msg.creation_date).toLocaleString()}</p>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {filePreview && (
                <div className="p-4 border-t bg-white flex items-center justify-start gap-4">
                    <div className="text-sm text-gray-600">Attachment Preview:</div>
                    <img
                        src={filePreview}
                        alt="Preview"
                        className="max-w-[100px] max-h-[100px] rounded object-contain border"
                    />
                </div>
            )}

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

export default PersonalChannel;
