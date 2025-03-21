import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sqlService from "../../services/sqlService";
import { UserContext } from "../../context/UserContext";
import { FaCog, FaPlus, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import "./ChannelPage.css";

const ChannelPage = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [marks, setMarks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("announcements");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    sqlService.getChannelById(channelId).then((data) => setChannel(data.data));
    sqlService.getChannelAnnouncements(channelId).then((data) => setAnnouncements(data.data));
    sqlService.getChannelAssignments(channelId).then((data) => setAssignments(data.data));
    sqlService.getChannelMarks(channelId).then((data) => setMarks(data.data));
    sqlService.getChannelMessages(channelId).then((data) => setMessages(data.data));

    if (user && !user.channels) {
      sqlService.getUserChannels(user.id).then((data) => {
        setUser((prevUser) => ({
          ...prevUser,
          channels: data.data,
        }));
      });
    }
  }, [channelId, user, setUser]);

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    sqlService.createAnnouncement({ userId: user.id, channelId, title, content }).then(() => {
      setAnnouncements([...announcements, { title, content, creation_date: new Date().toISOString() }]);
      setShowAnnouncementForm(false);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sqlService.createChannelMessage({ userId: user.id, channelId, content: newMessage }).then(() => {
      setMessages([...messages, { sender_name: user.name, content: newMessage, creation_date: new Date().toISOString() }]);
      setNewMessage("");
    });
  };

  if (!channel) {
    return <div className="text-center text-gray-600 text-lg">Loading...</div>;
  }

  const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-md rounded-xl p-6 border border-gray-300">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">{channel.name}</h1>
          {userRole === 1 && (
            <button
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
              onClick={() => navigate(`/channel/${channelId}/settings`)}
            >
              <FaCog size={20} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6 bg-white shadow-sm p-2 rounded-lg">
          {["announcements", "assignments", "marks", "messages"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-lg font-medium rounded-md transition duration-200 ${
                activeTab === tab
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "announcements" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              {(userRole === 1 || userRole === 2) && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition"
                  onClick={() => setShowAnnouncementForm(true)}
                >
                  <FaPlus /> Add Announcement
                </button>
              )}
              {showAnnouncementForm && (
                <form className="mt-4 space-y-3 bg-gray-100 p-4 rounded-md shadow" onSubmit={handleCreateAnnouncement}>
                  <input type="text" name="title" placeholder="Title" required className="w-full p-2 border rounded" />
                  <textarea name="content" placeholder="Content" required className="w-full p-2 border rounded"></textarea>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Create</button>
                </form>
              )}
              <div className="space-y-4 mt-4">
                {announcements.map((a, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border">
                    <h3 className="font-semibold text-lg text-gray-800">{a.title}</h3>
                    <p className="text-gray-700">{a.content}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(a.creation_date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                    <strong>{msg.sender_name}</strong>: {msg.content}
                    <p className="text-sm text-gray-500">{new Date(msg.creation_date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <form className="mt-4 flex space-x-2" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  required
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                  <FaPaperPlane className="mr-2" /> Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
