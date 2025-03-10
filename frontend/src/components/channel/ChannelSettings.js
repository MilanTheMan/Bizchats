import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import './ChannelSettings.css';

const ChannelSettings = () => {
    const { channelId } = useParams();
    const [members, setMembers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelMembers(channelId)
            .then(data => {
                setMembers(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [channelId]);

    const handleMakeAdmin = (userId) => {
        sqlService.updateUserRole({ userId, channelId, roleId: 2 }) // 2 for 'administrator'
            .then(data => {
                setMembers(members.map(member => member.id === userId ? { ...member, role: 2 } : member));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update user role");
            });
    };

    const handleRemoveMember = (memberId) => {
        sqlService.removeMember({ userId: user.id, channelId, memberId })
            .then(data => {
                setMembers(members.filter(member => member.id !== memberId));
            })
            .catch(err => {
                console.log(err);
                alert("Failed to remove member");
            });
    };

    return (
        <div className="channel-settings">
            <h1>Channel Settings</h1>
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
            <h2>General Settings</h2>
            {/* Add other general settings here */}
        </div>
    );
}

export default ChannelSettings;
