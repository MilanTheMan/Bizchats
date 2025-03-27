import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const ChannelWork = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);
    const [editAssignment, setEditAssignment] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelAssignments(channelId).then((data) => setAssignments(data.data));
    }, [channelId]);

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const due_date = e.target.due_date.value;
        if (editAssignment) {
            sqlService.updateAssignment({ id: editAssignment.id, title, description, due_date }).then(() => {
                setAssignments(assignments.map(a => a.id === editAssignment.id ? { ...a, title, description, due_date } : a));
                setShowAssignmentForm(false);
                setEditAssignment(null);
            });
        } else {
            sqlService.createAssignment({ userId: user.id, channelId, title, description, due_date }).then(() => {
                setAssignments([...assignments, { title, description, due_date, creation_date: new Date().toISOString() }]);
                setShowAssignmentForm(false);
            });
        }
    };

    const handleDeleteAssignment = (id) => {
        sqlService.deleteAssignment({ id }).then(() => {
            setAssignments(assignments.filter(a => a.id !== id));
        });
    };

    const handleEditAssignment = (assignment) => {
        setEditAssignment(assignment);
        setShowAssignmentForm(true);
    };

    const handleAssignmentClick = (assignmentId) => {
        navigate(`/channel/${channelId}/assignments/${assignmentId}/details`);
    };

    const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Assignments</h2>
            {(userRole === 1 || userRole === 2) && (
                <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition" onClick={() => setShowAssignmentForm(true)}>
                    <FaPlus /> Add Assignment
                </button>
            )}
            {showAssignmentForm && (
                <form className="mt-4 space-y-3 bg-gray-100 p-4 rounded-md shadow" onSubmit={handleCreateAssignment}>
                    <input type="text" name="title" placeholder="Title" required className="w-full p-2 border rounded" defaultValue={editAssignment?.title || ''} />
                    <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded" defaultValue={editAssignment?.description || ''}></textarea>
                    <input type="datetime-local" name="due_date" required className="w-full p-2 border rounded" defaultValue={editAssignment?.due_date || ''} />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">{editAssignment ? 'Update' : 'Create'}</button>
                </form>
            )}
            <div className="space-y-4 mt-4">
                {assignments.map((a, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border cursor-pointer" onClick={() => handleAssignmentClick(a.id)}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg text-gray-800">{a.title}</h3>
                            {(userRole === 1 || userRole === 2) && (
                                <div className="flex space-x-2">
                                    <FaEdit className="text-blue-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleEditAssignment(a); }} />
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDeleteAssignment(a.id); }} />
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700">{a.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Due: {new Date(a.due_date).toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(a.creation_date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelWork;
