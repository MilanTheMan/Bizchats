import React, { useState, useEffect, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaUserPlus, FaTrashAlt } from "react-icons/fa";
import placeholderImage from '../../img/Placeholder.jpg';

const Friends = () => {
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (user) {
            sqlService.getFriends(user.id).then((data) => setFriends(data.data));
        }
    }, [user]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        if (user) {
            sqlService.getChats(user.id).then((data) => {
                const friendMessages = data.data.filter(
                    (msg) => (msg.sender_id === user.id && msg.receiver_id === friend.id) || (msg.sender_id === friend.id && msg.receiver_id === user.id)
                );
                setMessages(friendMessages);
            });
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (user && selectedFriend) {
            sqlService.createChat({ sender_id: user.id, receiver_id: selectedFriend.id, content: newMessage }).then(() => {
                setMessages([...messages, { sender_id: user.id, receiver_id: selectedFriend.id, content: newMessage, creation_date: new Date().toISOString() }]);
                setNewMessage("");
            });
        }
    };

    const handleSearch = () => {
        if (user) {
            sqlService.getAllUsers().then((data) => {
                const friendIds = friends.map((friend) => friend.id);
                const results = data.data.filter(
                    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) && u.id !== user.id && !friendIds.includes(u.id)
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
                <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-300 ${
                                selectedFriend?.id === friend.id 
                                    ? "bg-blue-600 text-white scale-105 shadow-md" 
                                    : "hover:bg-blue-100"
                            }`}
                            onClick={() => handleFriendClick(friend)}
                        >
                            <img
                                src={friend.profile_picture || placeholderImage}
                                alt={friend.name}
                                className="w-10 h-10 rounded-full border border-blue-300"
                            />
                            <span className="font-medium">{friend.name}</span>
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
            <div className="w-3/4 p-6 overflow-y-auto">
                {selectedFriend ? (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Chat with <span className="text-blue-600">{selectedFriend.name}</span>
                            </h3>
                            <button 
                                onClick={() => handleUnfriend(selectedFriend.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2">
                            {messages.map((msg, i) => (
                                <div 
                                    key={i} 
                                    className={`p-3 rounded-xl max-w-[75%] text-sm shadow-sm ${
                                        msg.sender_id === user.id 
                                            ? "bg-blue-200 ml-auto text-right" 
                                            : "bg-white mr-auto text-left"
                                    }`}
                                >
                                    <p className="mb-1">{msg.content}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(msg.creation_date).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-all"
                            >
                                <FaPaperPlane className="animate-fade-in" />
                                Send
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                        Select a friend to start chatting or add a new friend.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
