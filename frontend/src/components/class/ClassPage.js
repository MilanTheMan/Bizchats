import React from "react";
import "./style.css";
import Header from "../header/Header";

const classData = {
  name: "C23 Math Class",
  announcements: [
    {
      id: 1,
      title: "Assignment two has been posted",
      date: "Nov 10th 2024",
      details: "Due: Nov 20th 2024 | Weight: 20%",
      type: "Assignment",
    },
    {
      id: 2,
      title: "Marks for Assignment One have been assigned",
      date: "Nov 5th 2024",
      details: "",
      type: "Marks",
    },
    {
      id: 3,
      title: "Lab class for Nov 2nd will be held online",
      date: "Nov 1st 2024",
      details: "",
      type: "Announcement",
    },
  ],
  chat: [
    {
      id: 1,
      user: "Fahad",
      message: "We need to finish the Figma Prototype",
      timestamp: "10/30/2024 2:00 PM",
    },
    {
      id: 2,
      user: "Milan",
      message: "Working on it now!",
      timestamp: "10/30/2024 2:14 PM",
    },
  ],
};

const ClassPage = () => {
  return (
    <div className="class-page">
      <Header/>
      {/* Header (not the one that appears on evey page) */}
      <header className="class-header">
        <h1>{classData.name}</h1>
      </header>


      <div className={"class-content"}>
        {/* Recent News Section */}
        <section className="recent-news">
          <h2>Recent News</h2>
          <div className="news-cards">
            {classData.announcements.map((announcement) => (
              <div key={announcement.id} className="news-card">
                <h3>{announcement.title}</h3>
                <p>{announcement.date}</p>
                <p>{announcement.details}</p>
                <span className={`tag ${announcement.type.toLowerCase()}`}>
                  {announcement.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Section */}
        <section className="class-chat">
          <h2>Group Chat</h2>
          <div className="chat-box">
            {classData.chat.map((message) => (
              <div key={message.id} className="chat-message">
                <p>
                  <strong>{message.user}</strong>: {message.message}
                </p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Enter a message..." />
            <button>Send</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClassPage;
