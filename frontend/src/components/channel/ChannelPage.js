import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';

const ChannelPage = () => {
    const { channelId } = useParams();
    const [channel, setChannel] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [marks, setMarks] = useState([]);
    const [activeTab, setActiveTab] = useState('announcements');
    const { user } = useContext(UserContext);

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
    }, [channelId]);

    const handleCreateAnnouncement = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        sqlService.createAnnouncement({ userId: user.id, channelId, title, content })
            .then(data => {
                alert("Announcement created successfully");
                setAnnouncements([...announcements, { title, content, creation_date: new Date().toISOString() }]);
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
                alert("Assignment created successfully");
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

    const userRole = user && user.channels && user.channels.find(c => c.id === channelId)?.role;

    return (
        <div>
            <h1>{channel.name}</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('announcements')}>Announcements</button>
                <button onClick={() => setActiveTab('assignments')}>Assignments</button>
                <button onClick={() => setActiveTab('marks')}>Marks</button>
            </div>
            <div className="tab-content">
                {activeTab === 'announcements' && (
                    <div>
                        <h2>Announcements</h2>
                        {userRole === 'owner' || userRole === 'administrator' ? (
                            <div>
                                <button onClick={() => setActiveTab('createAnnouncement')}>Add Announcement</button>
                                {activeTab === 'createAnnouncement' && (
                                    <form onSubmit={handleCreateAnnouncement}>
                                        <input type="text" name="title" placeholder="Title" required />
                                        <textarea name="content" placeholder="Content" required></textarea>
                                        <button type="submit">Create Announcement</button>
                                    </form>
                                )}
                            </div>
                        ) : null}
                        {announcements.map(announcement => (
                            <div key={announcement.id}>
                                <h3>{announcement.title}</h3>
                                <p>{announcement.content}</p>
                                <p>{new Date(announcement.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'assignments' && (
                    <div>
                        <h2>Assignments</h2>
                        {userRole === 'owner' || userRole === 'administrator' ? (
                            <div>
                                <button onClick={() => setActiveTab('createAssignment')}>Add Assignment</button>
                                {activeTab === 'createAssignment' && (
                                    <form onSubmit={handleCreateAssignment}>
                                        <input type="text" name="title" placeholder="Title" required />
                                        <textarea name="description" placeholder="Description" required></textarea>
                                        <input type="datetime-local" name="due_date" required />
                                        <button type="submit">Create Assignment</button>
                                    </form>
                                )}
                            </div>
                        ) : null}
                        {assignments.map(assignment => (
                            <div key={assignment.id}>
                                <h3>{assignment.title}</h3>
                                <p>{assignment.description}</p>
                                <p>Due: {new Date(assignment.due_date).toLocaleString()}</p>
                                <p>{new Date(assignment.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'marks' && (
                    <div>
                        <h2>Marks</h2>
                        {marks.map(mark => (
                            <div key={mark.id}>
                                <p>Assignment ID: {mark.assignment_id}</p>
                                <p>Mark: {mark.mark}</p>
                                <p>{new Date(mark.creation_date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChannelPage;
