import React, { useState, useEffect, useContext, useRef } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaUserPlus, FaTrashAlt, FaFileUpload } from "react-icons/fa";
import placeholderImage from '../../img/Placeholder.jpg';

const Friends = () => {
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (user) {
            sqlService.getFriends(user.id).then((data) => {
                console.log("Fetched Friends:", data.data);
                setFriends(data.data);
            });
        }
    }, [user]);
    

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        if (user) {
            sqlService.getChats(user.id).then((data) => {
                const friendMessages = data.data.filter(
                    (msg) =>
                        (msg.sender_id === user.id && msg.receiver_id === friend.id) ||
                        (msg.sender_id === friend.id && msg.receiver_id === user.id)
                );
                setMessages(friendMessages);
            });
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!user || !selectedFriend) return;

        let file_url = null;

        try {
            if (file) {
                const fileType = file.type.split('/')[1];
                const base64 = await toBase64(file);
                const uploadResponse = await sqlService.uploadAttachment({
                    base64,
                    fileType,
                    folder: `messages/friends/${user.id}_${selectedFriend.id}`
                });
                file_url = uploadResponse.file_url;
                console.log("Uploaded file URL:", file_url);
            }

            if (!newMessage && !file) {
                alert("Please enter a message or attach a file.");
                return;
            }

            const message = {
                sender_id: user.id,
                receiver_id: selectedFriend.id,
                content: newMessage || "",
                file_url,
                creation_date: new Date().toISOString()
            };

            await sqlService.createChat(message);

            setMessages([...messages, message]);
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

    const handleSearch = () => {
        if (user) {
            sqlService.getAllUsers().then((data) => {
                const friendIds = friends.map((friend) => friend.id);
                const results = data.data.filter(
                    (u) =>
                        u.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        u.id !== user.id &&
                        !friendIds.includes(u.id)
                );
                setSearchResults(results);
            });
        }
    };

    const handleAddFriend = (friendId) => {
        if (friends.some(friend => friend.id === friendId)) {
            alert("This user is already your friend.");
            return;
        }
        if (user) {
            sqlService.addFriend({ user_id: user.id, friend_id: friendId }).then(() => {
                sqlService.getFriends(user.id).then((data) => setFriends(data.data));
                alert("Friend added successfully!");
            }).catch(err => {
                console.log(err);
                alert("Failed to add friend. Please try again.");
            });
        }
    };

    const handleUnfriend = (friendId) => {
        if (user) {
            sqlService.deleteFriend({ user_id: user.id, friend_id: friendId }).then(() => {
                setFriends(friends.filter((friend) => friend.id !== friendId));
                if (selectedFriend?.id === friendId) {
                    setSelectedFriend(null);
                }
                alert("Friend removed successfully!");
            }).catch(err => {
                console.log(err);
                alert("Failed to remove friend. Please try again.");
            });
        }
    };

    if (!user) {
        return <div className="text-center text-gray-600 text-lg">Please log in to view your friends.</div>;
    }

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-white shadow-xl rounded-r-3xl overflow-y-auto">
                <h3 className="text-xl font-bold text-blue-700 mb-4">👥 Friends</h3>
                <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 flex flex-col">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-3 transition-all duration-300 ${selectedFriend?.id === friend.id
                                ? "bg-blue-600 text-white scale-105 shadow-md"
                                : "hover:bg-blue-100"
                                }`}
                            onClick={() => handleFriendClick(friend)}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={friend.profile_picture || placeholderImage}
                                    alt={friend.name}
                                    className="w-10 h-10 rounded-full border border-blue-300"
                                />
                                <span className="font-medium">{friend.name}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnfriend(friend.id);
                                }}
                                className="text-red-500 hover:text-red-700 transition"
                                title="Remove Friend"
                            >
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Add Friend */}
                <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-2">Add a Friend</h4>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-2"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-semibold"
                    >
                        Search
                    </button>

                    <div className="mt-4 space-y-2">
                        {searchResults.map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
                                <span className="text-gray-700">{result.name}</span>
                                <button
                                    onClick={() => handleAddFriend(result.id)}
                                    className="text-green-600 hover:text-green-800 transition"
                                >
                                    <FaUserPlus className="animate-pulse" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="w-3/4 flex flex-col h-full bg-gray-100 relative">
                <div className="flex-1 overflow-y-auto space-y-3 px-2 pb-40 pt-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-xl max-w-[75%] text-sm shadow-sm ${msg.sender_id === user.id
                                ? "bg-blue-200 ml-auto text-right"
                                : "bg-white mr-auto text-left"
                                }`}
                        >
                            {msg.file_url && msg.file_url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                                <img
                                    src={msg.file_url}
                                    alt="Attachment"
                                    className="max-w-[300px] max-h-[300px] rounded-lg mb-2 object-contain"
                                />
                            ) : msg.file_url ? (
                                <a
                                    href={msg.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Attachment
                                </a>
                            ) : null}
                            {msg.content && <p className="mb-1">{msg.content}</p>}
                            <span className="text-xs text-gray-500">
                                {new Date(msg.creation_date).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* File Preview */}
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

                {/* Message Input Form */}
                {selectedFriend && (
                    <form
                        className="w-full flex items-center gap-2 p-4 border-t bg-white"
                        onSubmit={handleSendMessage}
                        style={{ marginBottom: "64px" }}
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
                )}
            </div>
        </div>
    );
};

export default Friends;