import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './ChannelSettings.css';

const ChannelSettings = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [channelName, setChannelName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelById(channelId)
            .then(data => {
                setChannelName(data.data.name);
                setProfilePicture(data.data.profile_picture);
            })
            .catch(err => {
                console.log(err);
            });

        sqlService.getChannelMembers(channelId)
            .then(data => {
                setMembers(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [channelId]);

    const handleUpdateChannelName = () => {
        sqlService.updateChannelName({ channelId, name: channelName })
            .then(() => {
                alert("Channel name updated successfully!");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update channel name.");
            });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfilePicture = () => {
        sqlService.updateChannelPicture({ channelId, profile_picture: profilePicture })
            .then((data) => {
                setProfilePicture(data.profilePictureUrl); // Update the profile picture with the S3 URL
                alert("Profile picture updated successfully!");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update profile picture.");
            });
    };

    const handleMakeAdmin = (userId) => {
        sqlService.updateUserRole({ userId, channelId, roleId: 2 }) // 2 for 'administrator'
            .then(() => {
                setMembers(members.map(member => member.id === userId ? { ...member, role: 2 } : member));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update user role.");
            });
    };

    const handleRemoveMember = (memberId) => {
        sqlService.removeMember({ userId: user.id, channelId, memberId })
            .then(() => {
                setMembers(members.filter(member => member.id !== memberId));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to remove member.");
            });
    };

    return (
        <div className="channel-settings bg-gray-100 min-h-screen p-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
                Back
            </button>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Channel Settings</h1>
                <p className="text-gray-600 mb-6">Channel ID: <span className="font-mono text-blue-600">{channelId}</span></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Channel Name */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Channel Name</h2>
                        <input
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                        <button
                            onClick={handleUpdateChannelName}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Update Name
                        </button>
                    </div>

                    {/* Profile Picture */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                        <img
                            src={profilePicture}
                            alt="Channel"
                            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-400"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="w-full p-2 border rounded-lg"
                        />
                        <button
                            onClick={handleUpdateProfilePicture}
                            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                        >
                            Update Picture
                        </button>
                    </div>
                </div>

                {/* Members */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Members</h2>
                    <ul className="space-y-4">
                        {members.map(member => (
                            <li key={member.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
                                <div>
                                    <p className="font-medium text-gray-800">{member.name} ({member.email})</p>
                                    <p className="text-sm text-gray-600">{member.role === 1 ? 'Owner' : member.role === 2 ? 'Administrator' : 'Member'}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {user.role === 1 && member.role !== 1 && (
                                        <>
                                            <button
                                                onClick={() => handleMakeAdmin(member.id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                                            >
                                                Make Admin
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                    {user.role === 2 && member.role === 3 && (
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChannelSettings;
