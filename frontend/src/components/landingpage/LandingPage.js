import React from 'react';
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landingpage-container">
            <div className="welcome-section">
                <h1>Welcome to BizChats</h1>
                <h2>Unite Ideas, Achieve Goals.</h2>
                <p>
                    BizChats is an application focused on improving communication, collaboration, and task management for educational and business users. 
                    It offers scheduling, file sharing, and project collaboration, supporting remote work and real-time communication to enhance teamwork and productivity.
                </p>
            </div>
            <div className="features-section">
                <h3>With BizChats, you can:</h3>
                <ul>
                    <li>Communicate seamlessly with real-time messaging and video calls.</li>
                    <li>Collaborate efficiently using file sharing, task management, and shared workspaces.</li>
                    <li>Boost productivity with integrated project management and notifications.</li>
                    <li>Work flexibly with support for remote and hybrid teams.</li>
                    <li>Stay secure with encrypted data protection.</li>
                </ul>
                <p>
                    BizChats bridges the gap between ideas and execution for students, educators, and professionals.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;