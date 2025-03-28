import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './ChannelSettings.css';

const ChannelSettings = () => {
    const { channelId } = useParams();
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
        sqlService.updateChannel({ channelId, name: channelName })
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
        sqlService.updateChannel({ channelId, profile_picture: profilePicture })
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
        <div className="channel-settings">
            <h1>Channel Settings</h1>
            <h2>General Settings</h2>
            <div className="general-settings">
                <div className="setting-item">
                    <label>Channel Name</label>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleUpdateChannelName}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Update Name
                    </button>
                </div>
                <div className="setting-item">
                    <label>Profile Picture</label>
                    <img
                        src={profilePicture}
                        alt="Channel"
                        className="w-24 h-24 rounded-full mb-4 border-4 border-blue-400"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleUpdateProfilePicture}
                        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                    >
                        Update Picture
                    </button>
                </div>
            </div>
            <h2>Members</h2>
            <ul>
                {members.map(member => (
                    <li key={member.id}>
                        <p>{member.name} ({member.email}) - {member.role === 1 ? 'Owner' : member.role === 2 ? 'Administrator' : 'Member'}</p>
                        {user.role === 1 && member.role !== 1 && (
                            <>
                                <button onClick={() => handleMakeAdmin(member.id)}>Make Administrator</button>
                                <button onClick={() => handleRemoveMember(member.id)}>Remove Member</button>
                            </>
                        )}
                        {user.role === 2 && member.role === 3 && (
                            <button onClick={() => handleRemoveMember(member.id)}>Remove Member</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelSettings;
