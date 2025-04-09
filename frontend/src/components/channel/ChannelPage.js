import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Outlet, NavLink } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './ChannelPage.css';

const ChannelPage = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelById(channelId).then((data) => setChannel(data.data));

        if (user && !user.channels) {
            sqlService.getUserChannels(user.id).then((data) => {
                setUser((prevUser) => ({
                    ...prevUser,
                    channels: data.data,
                }));
            });
        }
    }, [channelId, user, setUser]);

    if (!channel) {
        return <div className="text-center text-gray-600 text-lg">Loading channel...</div>;
    }

    const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

    return (
        <div className="channel-page">
            {/* Channel Banner */}
            <div className="channel-banner">
                <img
                    src={channel.profile_picture}
                    alt={`${channel.name} Banner`}
                    className="channel-banner-image"
                />
                <div className="channel-banner-overlay">
                    <h1 className="channel-name">{channel.name}</h1>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="tabs">
                <NavLink
                    to={`/channel/${channelId}/announcements`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Announcements
                </NavLink>
                <NavLink
                    to={`/channel/${channelId}/assignments`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Assignments
                </NavLink>
                {userRole === 1 ? (
                <NavLink
                    to={`/channel/${channelId}/marks-admin`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Marks
                </NavLink>
                ) : (
                <NavLink
                    to={`/channel/${channelId}/marks`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Marks
                </NavLink>
                )}
                <NavLink
                    to={`/channel/${channelId}/messages`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Messages
                </NavLink>
                {userRole === 1 && (
                    <NavLink
                        to={`/channel/${channelId}/settings`}
                        className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                    >
                        Settings
                    </NavLink>
                )}
            </nav>

            {/* Tab Content */}
            <div className="tab-content">
                <Outlet />
            </div>
        </div>
    );
};

export default ChannelPage;
