import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Outlet, Link } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaCog } from "react-icons/fa";
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
        return <div className="text-center text-gray-600 text-lg">Loading...</div>;
    }

    const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

    const handleTabClick = (tab) => {
        if (tab === "marks" && (userRole === 1 || userRole === 2)) {
            navigate(`/channel/${channelId}/marks-admin`);
        } else {
            navigate(`/channel/${channelId}/${tab}`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-[80vh] p-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-md rounded-xl p-6 border border-gray-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-800">{channel.name}</h1>
                    {userRole === 1 && (
                        <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition" onClick={() => navigate(`/channel/${channelId}/settings`)}>
                            <FaCog size={20} />
                        </button>
                    )}
                </div>

                <div className="flex space-x-4 mt-6 bg-white shadow-sm p-2 rounded-lg">
                    {["announcements", "assignments", "marks", "messages"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 text-lg font-medium rounded-md transition duration-200 ${window.location.pathname.includes(tab) ? "bg-blue-500 text-white shadow" : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ChannelPage;
