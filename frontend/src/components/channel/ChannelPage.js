import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './ChannelPage.css';
import settingsIcon from '../../img/settings-icon.png'; // Ensure the path to the settings icon is correct

const ChannelPage = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [marks, setMarks] = useState([]);
    const [activeTab, setActiveTab] = useState('announcements');
    const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelById(channelId)
            .then(data => {
                setChannel(data.data);
            })
            .catch(err => {
                console.log(err);
            });

        sqlService.getChannelAnnouncements(channelId)
            .then(data => {
                setAnnouncements(data.data);
            })
            .catch(err => {
                console.log(err);
            });

        sqlService.getChannelAssignments(channelId)
            .then(data => {
                setAssignments(data.data);
            })
            .catch(err => {
                console.log(err);
            });

        sqlService.getChannelMarks(channelId)
            .then(data => {
                setMarks(data.data);
            })
            .catch(err => {
                console.log(err);
            });

        // Fetch user channels to update the user context with roles
        if (user && !user.channels) {
            sqlService.getUserChannels(user.id)
                .then(data => {
                    setUser(prevUser => ({
                        ...prevUser,
                        channels: data.data
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [channelId, user, setUser]);

    const handleCreateAnnouncement = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        sqlService.createAnnouncement({ userId: user.id, channelId, title, content })
            .then(data => {
                setAnnouncements([...announcements, { title, content, creation_date: new Date().toISOString() }]);
                setShowAnnouncementForm(false);
            })
            .catch(err => {
                console.log(err);
                alert("Failed to create announcement");
            });
    };

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const due_date = e.target.due_date.value;
        sqlService.createAssignment({ userId: user.id, channelId, title, description, due_date })
            .then(data => {
                setAssignments([...assignments, { title, description, due_date, creation_date: new Date().toISOString() }]);
            })
            .catch(err => {
                console.log(err);
                alert("Failed to create assignment");
            });
    };

    if (!channel) {
        return <div>Loading...</div>;
    }

    const userRole = user && user.channels && user.channels.find(c => c.id === parseInt(channelId))?.role;
    console.log("User Role:", userRole); // Debugging line to check the user's role

    return (
        <div className="channel-page">
            <h1 className="channel-name">{channel.name}</h1>
            {userRole === 1 && (
                <button className="settings-button" onClick={() => navigate(`/channel/${channelId}/settings`)}>
                    <img src={settingsIcon} alt="Settings" />
                </button>
            )}
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>Announcements</button>
                <button className={`tab-button ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>Assignments</button>
                <button className={`tab-button ${activeTab === 'marks' ? 'active' : ''}`} onClick={() => setActiveTab('marks')}>Marks</button>
            </div>
            <div className="tab-content">
                {activeTab === 'announcements' && (
                    <div>
                        <h2 className="section-header">Announcements</h2>
                        {userRole === 1 || userRole === 2 ? ( // 1 for 'owner', 2 for 'administrator'
                            <div>
                                <button className="add-button" onClick={() => setShowAnnouncementForm(true)}>Add Announcement</button>
                                {showAnnouncementForm && (
                                    <form className="form" onSubmit={handleCreateAnnouncement}>
                                        <input type="text" name="title" placeholder="Title" required />
                                        <textarea name="content" placeholder="Content" required></textarea>
                                        <button type="submit">Create Announcement</button>
                                    </form>
                                )}
                            </div>
                        ) : null}
                        {announcements.map(announcement => (
                            <div key={announcement.id} className="announcement">
                                <h3>{announcement.title}</h3>
                                <p>{announcement.content}</p>
                                <p className="date">{new Date(announcement.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'assignments' && (
                    <div>
                        <h2 className="section-header">Assignments</h2>
                        {userRole === 1 || userRole === 2 ? ( // 1 for 'owner', 2 for 'administrator'
                            <div>
                                <button className="add-button" onClick={() => setActiveTab('createAssignment')}>Add Assignment</button>
                                {activeTab === 'createAssignment' && (
                                    <form className="form" onSubmit={handleCreateAssignment}>
                                        <input type="text" name="title" placeholder="Title" required />
                                        <textarea name="description" placeholder="Description" required></textarea>
                                        <input type="datetime-local" name="due_date" required />
                                        <button type="submit">Create Assignment</button>
                                    </form>
                                )}
                            </div>
                        ) : null}
                        {assignments.map(assignment => (
                            <div key={assignment.id} className="assignment">
                                <h3>{assignment.title}</h3>
                                <p>{assignment.description}</p>
                                <p className="date">Due: {new Date(assignment.due_date).toLocaleString()}</p>
                                <p className="date">{new Date(assignment.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'marks' && (
                    <div>
                        <h2 className="section-header">Marks</h2>
                        {marks.map(mark => (
                            <div key={mark.id} className="mark">
                                <p>Assignment ID: {mark.assignment_id}</p>
                                <p>Mark: {mark.mark}</p>
                                <p className="date">{new Date(mark.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChannelPage;
