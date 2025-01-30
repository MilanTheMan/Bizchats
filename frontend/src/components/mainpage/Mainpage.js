import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import sqlService from '../../services/sqlService';
import Navbar from '../navbar/Navbar';
import Header from "../header/Header";

const Mainpage = () => {
    const [channels, setChannels] = useState([]);
    const [newChannelName, setNewChannelName] = useState('');
    const [joinChannelId, setJoinChannelId] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            sqlService.getUserChannels(user.id)
                .then(data => {
                    setChannels(data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    const handleCreateChannel = (e) => {
        e.preventDefault();
        if (user) {
            sqlService.createChannel({ name: newChannelName, role_id: 1, profile_picture: null, userId: user.id })
                .then(data => {
                    alert("Channel created successfully");
                    setChannels([...channels, { id: data.channelId, name: newChannelName }]);
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
                .then(data => {
                    alert("Joined channel successfully");
                    // Optionally, fetch channels again to update the list
                    sqlService.getUserChannels(user.id)
                        .then(data => {
                            setChannels(data.data);
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

    const handleChannelClick = (channelId) => {
        navigate(`/channel/${channelId}`);
    };

    return (
        <div id={"main_page"}>
            <Navbar />
            <h1>Welcome to BizChats!</h1>
            <div className={"actual_content"}>
                <div className="class_list">
                    {channels.map(channel => (
                        <div key={channel.id} className="listed_class" onClick={() => handleChannelClick(channel.id)}>
                            <img src='https://geology.com/world/world-map.gif' alt="Channel" />
                            <p>{channel.name}</p>
                        </div>
                    ))}
                </div>
                <aside className="events">
                    <h4>Events</h4>
                    <div className={"event_list"}>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                    </div>
                </aside>
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
}

export default Mainpage;