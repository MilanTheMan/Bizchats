import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Homepage.css';
import ManIpad from '../../img/ManIpad-min.jpg';
import Meeting from '../../img/Meeting-min.jpg';
import WomanShake from '../../img/WomanShake-min.jpg';

function Homepage() {
    const { user } = useContext(UserContext);

    return (
        <div className="homepage">
            <main className="main-content">
                <section className="welcome-section">
                    {user ? (
                        <>
                            <h1>Welcome, {user.name}!</h1>
                            <a href="/home" className="btn main-page-btn">Go to Main Page</a>
                        </>
                    ) : (
                        <h1>Welcome to BizChats!</h1>
                    )}
                    <p>Your one-stop solution for communication and project management.</p>
                    {!user && (
                        <div className="auth-buttons">
                            <a href="/login" className="btn">Login</a>
                            <a href="/signup" className="btn">Sign Up</a>
                        </div>
                    )}
                </section>
                <section className="features-section">
                    <h2>Features</h2>
                    <div className="features">
                        <div className="feature">
                            <img src={ManIpad} alt="Real-time Messaging" />
                            <h3>Real-time Messaging</h3>
                            <p>Communicate with your team in real-time.</p>
                        </div>
                        <div className="feature">
                            <img src={Meeting} alt="Channel Management" />
                            <h3>Channel Management</h3>
                            <p>Create and join channels to organize your conversations.</p>
                        </div>
                        <div className="feature">
                            <img src={WomanShake} alt="File Sharing" />
                            <h3>File Sharing</h3>
                            <p>Share files and documents with your team.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Homepage;
