import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const ChannelAnnouncements = () => {
    const { channelId } = useParams();
    const [announcements, setAnnouncements] = useState([]);
    const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelAnnouncements(channelId).then((data) => setAnnouncements(data.data));
    }, [channelId]);

    const handleCreateAnnouncement = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        if (editAnnouncement) {
            sqlService.updateAnnouncement({ id: editAnnouncement.id, title, content }).then(() => {
                setAnnouncements(announcements.map(a => a.id === editAnnouncement.id ? { ...a, title, content } : a));
                setShowAnnouncementForm(false);
                setEditAnnouncement(null);
            });
        } else {
            sqlService.createAnnouncement({ userId: user.id, channelId, title, content }).then(() => {
                setAnnouncements([...announcements, { title, content, creation_date: new Date().toISOString() }]);
                setShowAnnouncementForm(false);
            });
        }
    };

    const handleDeleteAnnouncement = (id) => {
        sqlService.deleteAnnouncement({ id }).then(() => {
            setAnnouncements(announcements.filter(a => a.id !== id));
        });
    };

    const handleEditAnnouncement = (announcement) => {
        setEditAnnouncement(announcement);
        setShowAnnouncementForm(true);
    };

    const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Announcements</h2>
            {(userRole === 1 || userRole === 2) && (
                <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition" onClick={() => setShowAnnouncementForm(true)}>
                    <FaPlus /> Add Announcement
                </button>
            )}
            {showAnnouncementForm && (
                <form className="mt-4 space-y-3 bg-gray-100 p-4 rounded-md shadow" onSubmit={handleCreateAnnouncement}>
                    <input type="text" name="title" placeholder="Title" required className="w-full p-2 border rounded" defaultValue={editAnnouncement?.title || ''} />
                    <textarea name="content" placeholder="Content" required className="w-full p-2 border rounded" defaultValue={editAnnouncement?.content || ''}></textarea>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">{editAnnouncement ? 'Update' : 'Create'}</button>
                </form>
            )}
            <div className="space-y-4 mt-4">
                {announcements.map((a, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-800">{a.title}</h3>
                            {(userRole === 1 || userRole === 2) && (
                                <div className="flex space-x-2">
                                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEditAnnouncement(a)} />
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteAnnouncement(a.id)} />
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700">{a.content}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(a.creation_date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelAnnouncements;
