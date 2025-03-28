import React, { useState, useEffect, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPaperPlane, FaUserPlus } from "react-icons/fa";

const Friends = () => {
    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        sqlService.getFriends(user.id).then((data) => setFriends(data.data));
    }, [user.id]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        sqlService.getChats(user.id).then((data) => {
            const friendMessages = data.data.filter(
                (msg) => (msg.sender_id === user.id && msg.receiver_id === friend.id) || (msg.sender_id === friend.id && msg.receiver_id === user.id)
            );
            setMessages(friendMessages);
        });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        sqlService.createChat({ sender_id: user.id, receiver_id: selectedFriend.id, content: newMessage }).then(() => {
            setMessages([...messages, { sender_id: user.id, receiver_id: selectedFriend.id, content: newMessage, creation_date: new Date().toISOString() }]);
            setNewMessage("");
        });
    };

    const handleSearch = () => {
        sqlService.getAllUsers().then((data) => {
            const friendIds = friends.map((friend) => friend.id);
            const results = data.data.filter(
                (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) && u.id !== user.id && !friendIds.includes(u.id)
            );
            setSearchResults(results);
        });
    };

    const handleAddFriend = (friendId) => {
        sqlService.addFriend({ user_id: user.id, friend_id: friendId }).then(() => {
            sqlService.getFriends(user.id).then((data) => setFriends(data.data));
            alert("Friend added successfully!");
        });
    };

    return (
        <div className="flex">
            <div className="w-1/4 bg-gray-100 p-4 border-r">
                <h3 className="text-lg font-semibold mb-4">Friends</h3>
                <ul className="space-y-2">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className={`p-2 rounded cursor-pointer ${selectedFriend?.id === friend.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                            onClick={() => handleFriendClick(friend)}
                        >
                            {friend.name}
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <h4 className="text-md font-semibold mb-2">Add a Friend</h4>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Search
                    </button>
                    <div className="flex flex-wrap gap-4 mt-4">
                        {searchResults.map((result) => (
                            <div key={result.id} className="flex justify-between items-center p-2 border rounded w-48">
                                <span>{result.name}</span>
                                <button onClick={() => handleAddFriend(result.id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                                    <FaUserPlus />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-3/4 p-4">
                {selectedFriend ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Chat with {selectedFriend.name}</h3>
                        <div className="space-y-3 mb-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`p-2 rounded ${msg.sender_id === user.id ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                                    <p>{msg.content}</p>
                                    <p className="text-sm text-gray-500">{new Date(msg.creation_date).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                        <form className="flex space-x-2" onSubmit={handleSendMessage}>
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
                ) : (
                    <p className="text-gray-600">Select a friend to start chatting or add a new friend.</p>
                )}
            </div>
        </div>
    );
};

export default Friends;
