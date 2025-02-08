import React, { useState, useContext, useEffect } from 'react';
import './Chatbot.css';
import chatIcon from '../../img/chat-icon.png'; // Ensure the path to the chat icon is correct
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useContext(UserContext);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (user) {
            sqlService.getFriends(user.id)
                .then(data => {
                    setFriends(data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        sqlService.getChats(user.id)
            .then(data => {
                const friendMessages = data.data.filter(
                    msg => (msg.sender_id === user.id && msg.receiver_id === friend.id) ||
                        (msg.sender_id === friend.id && msg.receiver_id === user.id)
                );
                setMessages(friendMessages);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const messageData = {
            sender_id: user.id,
            receiver_id: selectedFriend.id,
            content: newMessage
        };
        sqlService.createChat(messageData)
            .then(data => {
                setMessages([...messages, { ...messageData, creation_date: new Date().toISOString() }]);
                setNewMessage('');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleBack = () => {
        setSelectedFriend(null);
        setMessages([]);
    };

    return (
        <div className="chatbot-container">
            <button className={`chatbot-button ${isOpen ? 'active' : ''}`} onClick={toggleChatbot}>
                <img src={chatIcon} alt="Chatbot" />
            </button>
            {isOpen && (
                <div className="chatbot-widget">
                    {selectedFriend ? (
                        <div className="chat-section">
                            <button className="back-button" onClick={handleBack}>Back</button>
                            <h3>Chat with {selectedFriend.name}</h3>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender_id === user.id ? 'sent' : 'received'}`}>
                                        <p>{msg.content}</p>
                                        <span>{new Date(msg.creation_date).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message"
                                    required
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h3>Friends</h3>
                            <ul>
                                {friends.map(friend => (
                                    <li key={friend.id} onClick={() => handleFriendClick(friend)}>
                                        <p>{friend.name} ({friend.email})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;
