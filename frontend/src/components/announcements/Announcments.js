import React, { useState } from 'react';
import "./Announcements.css";

const Announcements = () => {
    // Placeholder announcements
    const [announcements] = useState([
        { id: 1, title: "Welcome to BizChats!", content: "We're excited to have you here. Stay tuned for updates!" },
        { id: 2, title: "New Feature Coming Soon", content: "We're working on something amazing. Keep an eye out for announcements!" },
        { id: 3, title: "Scheduled Maintenance", content: "Our platform will undergo maintenance on Sunday at 2 AM UTC." }
    ]);

    return (
        <div className="announcements-container">
            <h2>Announcements</h2>
            <ul>
                {announcements.map(announcement => (
                    <li key={announcement.id} className="announcement-item">
                        <h3>{announcement.title}</h3>
                        <p>{announcement.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Announcements;
