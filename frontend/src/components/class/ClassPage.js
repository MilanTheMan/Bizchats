import React, {useState} from "react";
import "./style.css";
import ProfileCard from "../profile_card/ProfileCard";
import fox from "../../img/pfp/other_samples/fox.webp"
import birb from "../../img/pfp/other_samples/birb.webp"
import squirrel from "../../img/pfp/other_samples/squirrel.webp"


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
      id: 0,
      user: "Fahad",
      pfp: squirrel,
      message: "We need to finish the Figma Prototype",
      description: "Sample Description",
      timestamp: "10/30/2024 2:00 PM",
    },
    {
      id: 1,
      user: "Milan",
      pfp: birb,
      message: "Working on it now!",
      description: "another sample description",
      timestamp: "10/30/2024 2:14 PM",
    },
    {
      id: 2,
      user: "AAAAAAAAAAAAAAAAAAAAA",
      pfp: fox,
      message: "🦊",
      description: "🦊🦊🦊🦊🦊🦊🦊🦊🦊",
      timestamp: "01/24/2025 3:59 PM",
    },
  ],
};

const ClassPage = () => {
  const [testUser, setTestUser] = useState({
    user: "Test",
    pfp: fox,
    description: "i exist only for testing purposes"
  })
  const [testPosts, setTestPosts] = useState(classData.chat)
  const [message, setMessage] = useState("")

  const [profileCards, setProfileCards] = React.useState([]);
  const showProfileCard = (user, description, pfp) => {
    setProfileCards((prevCards) => [
      ...prevCards,
      <ProfileCard user={user} description={description} pfp={pfp} />
    ]);
  }

  const addNewMessage = () => {
    setTestPosts((prevPosts) => [
      ...prevPosts,
      {
        id: testPosts.length,
        user: testUser.user,
        pfp: testUser.pfp,
        message: message,
        description: testUser.description,
        timestamp: "10/30/2024 2:00 PM",
      },
    ]);
    setMessage("")
  }

  function handleMessageChange(event){
    setMessage(event.target.value)
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
            {testPosts.map((message) => (
              <div key={message.id} className="chat-message">
                <div className={"user_and_message"}>
                  <p className={"chat_username"} onClick={() => { showProfileCard(message.user, message.description, message.pfp) }}>{message.user}: </p>
                  <p className={"chat_user_message"}>{message.message}</p>
                </div>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={(event) => {
              event.preventDefault();
          }}>
            <input type="text" placeholder="Enter a message..." value={message} onChange={handleMessageChange}/>
            <button onClick={addNewMessage} type="submit">Send</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ClassPage;
