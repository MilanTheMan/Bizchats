import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import sqlService from '../../services/sqlService';
import './style.css';

const Mainpage = () => {
    const [channels, setChannels] = useState([]);
    const [newChannelName, setNewChannelName] = useState('');
    const [joinChannelId, setJoinChannelId] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { category } = useParams();

    useEffect(() => {
        if (user) {
            sqlService.getUserChannels(user.id)
                .then(data => {
                    setChannels(data.data || []); // Ensure channels are set even if empty
                })
                .catch(err => {
                    console.log(err);
                    setChannels([]);
                });
        }
    }, [user]);

    const handleCreateChannel = (e) => {
        e.preventDefault();
        if (user) {
            const categoryId = getCategoryFromPath();
            sqlService.createChannel({ name: newChannelName, role_id: 1, profile_picture: null, userId: user.id, category: categoryId })
                .then(() => {
                    window.location.reload(); // Refresh the screen
                })
                .catch(err => {
                    console.log(err);
                    alert("Failed to create channel");
                });
        }
    };

    const handleJoinChannel = (e) => {
        e.preventDefault();
        if (user) {
            sqlService.joinChannel({ userId: user.id, channelId: joinChannelId, roleId: 3 }) // 3 for 'member'
                .then(() => {
                    sqlService.getUserChannels(user.id)
                        .then(data => {
                            setChannels(data.data || []);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    alert("Failed to join channel");
                });
        }
    };

    const handleChannelClick = (channel) => {
        if (channel.category === 1) {
            navigate(`/personal-channel/${channel.id}`);
        } else if (channel.category === 2) {
            navigate(`/channel/${channel.id}`);
        } else if (channel.category === 3) {
            navigate(`/professional/${channel.id}`);
        }
    };

    const getCategoryFromPath = () => {
        if (category === 'personal') return 1;
        if (category === 'educational') return 2;
        if (category === 'professional') return 3;
        return null;
    };

    const filteredChannels = channels.filter(channel => channel.category === getCategoryFromPath());

    return (
        <div id="main_page">
            <div className="actual_content">
                <div className="class_list">
                    {filteredChannels.map(channel => (
                        <div key={channel.id} className="listed_class" onClick={() => handleChannelClick(channel)}>
                            <img src={channel.profile_picture} alt="Channel" />
                            <p>{channel.name}</p>
                        </div>
                    ))}
                </div>
                <div className="channel_actions">
                    <form onSubmit={handleCreateChannel}>
                        <h3>Create Channel</h3>
                        <input
                            type="text"
                            value={newChannelName}
                            onChange={(e) => setNewChannelName(e.target.value)}
                            placeholder="Channel Name"
                        />
                        <button type="submit">Create</button>
                    </form>
                    <form onSubmit={handleJoinChannel}>
                        <h3>Join Channel</h3>
                        <input
                            type="text"
                            value={joinChannelId}
                            onChange={(e) => setJoinChannelId(e.target.value)}
                            placeholder="Channel ID"
                        />
                        <button type="submit">Join</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;