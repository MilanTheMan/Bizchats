import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import ChannelMessages from './ChannelMessages';
import ProfessionalDoccuments from './ProfessionalDoccuments';
import ChannelSchedule from './ChannelSchedule';
import ChannelSettings from './ChannelSettings';
import './ProfessionalPage.css';

const ProfessionalPage = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [activeTab, setActiveTab] = useState('messages');
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'messages':
                return <ChannelMessages />;
            case 'documents':
                return <ProfessionalDoccuments />;
            case 'schedule':
                return <ChannelSchedule />;
            case 'settings':
                return userRole === 1 ? <ChannelSettings /> : <div className="text-center text-gray-600">Access Denied</div>;
            default:
                return null;
        }
    };

    return (
        <div className="professional-page">
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
                <button
                    className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Messages
                </button>
                <button
                    className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
                    onClick={() => setActiveTab('documents')}
                >
                    Documents
                </button>
                <button
                    className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schedule')}
                >
                    Schedule
                </button>
                {userRole === 1 && (
                    <button
                        className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                )}
            </nav>

            {/* Tab Content */}
            <div className="tab-content">{renderTabContent()}</div>
        </div>
    );
};

export default ProfessionalPage;
