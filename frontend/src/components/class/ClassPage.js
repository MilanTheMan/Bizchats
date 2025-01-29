import React from "react";
import "./style.css";
import ProfileCard from "../profile_card/ProfileCard";
import profileCard from "../profile_card/ProfileCard";

const classData = { //this is just sample data
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
      description: "hsdkofjsdkfsdjklsdjf;lksdf",
      timestamp: "10/30/2024 2:00 PM",
    },
    {
      id: 2,
      user: "Milan",
      message: "Working on it now!",
      description: "haesdriohuoasrogh[oiawgr9u0",
      timestamp: "10/30/2024 2:14 PM",
    },
    {
      id: 3,
      user: "AAAAAAAAAAAAAAAAAAAAA",
      message: "🦊",
      description: "🦊🦊🦊🦊🦊🦊🦊🦊🦊",
      timestamp: "01/24/2025 3:59 PM",
    },
    {
      id: 3,
      user: "Tres",
      message: "OI OI OI BAAAAAAAAAKA",
      description: "Ochinchin suki dayo",
      timestamp: "02/34/2029 6:69 PM",
    },
  ],
};

const ClassPage = () => {

  const [profileCards, setProfileCards] = React.useState([]);
  const showProfileCard = (user, description) => {
    setProfileCards((prevCards) => [
      ...prevCards,
      <ProfileCard user={user} description={description}/>
    ]);
  }


  return (
    <div className="class-page">
      {/* Header (not the one that appears on evey page) */}

      <div className={"profile_card_holder"}>
        {profileCards.map(profileCard => profileCard)}
      </div>

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
                <div className={"user_and_message"}>
                  <p className={"chat_username"} onClick={() => {showProfileCard(message.user, message.description)}}>{message.user}: </p>
                  <p className={"chat_user_message"}>{message.message}</p>
                </div>
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
