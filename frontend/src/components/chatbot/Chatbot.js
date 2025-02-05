import React, { useState } from 'react';
import './Chatbot.css';
import chatIcon from '../../img/chat-icon.png'; // Ensure the path to the chat icon is correct

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatbot-container">
            <button className="chatbot-button" onClick={toggleChatbot}>
                <img src={chatIcon} alt="Chatbot" />
            </button>
            {isOpen && (
                <div className="chatbot-widget">
                    <h2>Chatbot</h2>
                    <p>This is a chatbot widget.</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
