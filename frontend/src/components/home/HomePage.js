import React from 'react';
import './style.css';
import bizchatLogo from '../../img/bizchats_logo.png'; 
import personalImg from '../../img/personal_logo.jpg';
import educationalImg from '../../img/educational_logo.jpg';
import professionalImg from '../../img/professional_logo.jpg';

const Home = () => {
    return (
        <div className="home">
            {/* Header */}
            <header className="home-header">
                <img src={bizchatLogo} alt="BizChat Logo" className="logo" />
                <h1>BizChat</h1>
                <div className="user-icon">
                    <img src="https://via.placeholder.com/50" alt="User" className="user-avatar" />
                </div>
            </header>

            {/* Main Section */}
            <main className="home-main">
                <h2>Welcome to BizChats</h2>
                <p>How will you use BizChats?</p>

                <div className="options">
                    <div className="option">
                        <img src={personalImg} alt="Personal" />
                        <h3>Personal</h3>
                    </div>
                    <div className="option">
                        <img src={educationalImg} alt="Educational" />
                        <h3>Educational</h3>
                    </div>
                    <div className="option">
                        <img src={professionalImg} alt="Professional" />
                        <h3>Professional</h3>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
