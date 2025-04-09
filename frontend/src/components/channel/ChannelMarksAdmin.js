import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaPencilAlt } from "react-icons/fa";

const ChannelMarksAdmin = () => {
    const { channelId } = useParams();
    const [members, setMembers] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [marks, setMarks] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [editingMark, setEditingMark] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const membersData = await sqlService.getChannelMembers(channelId);
                const assignmentsData = await sqlService.getChannelAssignments(channelId);
                const marksData = await sqlService.getChannelMarks(channelId);
                const submissionsData = await sqlService.getSubmissions(channelId);

                setMembers(membersData.data);
                setAssignments(assignmentsData.data);
                setMarks(marksData.data);
                setSubmissions(submissionsData.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [channelId]);

    const getAverageMark = (userId) => {
        const userMarks = marks.filter(mark => mark.user_id === userId);
        const totalMarks = userMarks.reduce((sum, mark) => sum + mark.mark, 0);
        return userMarks.length ? (totalMarks / userMarks.length).toFixed(2) : '0';
    };

    const getMarkForAssignment = (userId, assignmentId) => {
        const mark = marks.find(mark => mark.user_id === userId && mark.assignment_id === assignmentId);
        return mark ? mark.mark : null;
    };

    const isSubmitted = (userId, assignmentId) => {
        return submissions.some(submission => submission.user_id === userId && submission.assignment_id === assignmentId);
    };

    const handleMarkChange = (userId, assignmentId, value) => {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
            alert("Please enter a valid mark between 0 and 100.");
            return;
        }

        sqlService.submitMark({ channelId, userId, assignmentId, mark: numericValue }).then(() => {
            setMarks(prevMarks => {
                const existingMark = prevMarks.find(mark => mark.user_id === userId && mark.assignment_id === assignmentId);
                if (existingMark) {
                    return prevMarks.map(mark =>
                        mark.user_id === userId && mark.assignment_id === assignmentId
                            ? { ...mark, mark: numericValue }
                            : mark
                    );
                } else {
                    return [...prevMarks, { user_id: userId, assignment_id: assignmentId, mark: numericValue }];
                }
            });
            setEditingMark(null);
        }).catch(err => {
            console.log(err);
            alert("Failed to submit mark. Please try again.");
        });
    };

    const handleEditClick = (userId, assignmentId) => {
        setEditingMark({ userId, assignmentId });
    };

    const handleSubmitResults = () => {
        sqlService.submitResults({ channelId }).then(() => {
            alert("Results submitted successfully!");
        }).catch(err => {
            console.log(err);
            alert("Failed to submit results. Please try again.");
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Marks</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Student</th>
                            <th className="py-2 px-4 border-b">Average Mark</th>
                            {assignments.map((assignment) => (
                                <th key={assignment.id} className="py-2 px-4 border-b text-center">{assignment.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td className="py-2 px-4 border-b text-center">{member.name}</td>
                                <td className="py-2 px-4 border-b text-center">{getAverageMark(member.id)}</td>
                                {assignments.map((assignment) => (
                                    <td key={assignment.id} className="py-2 px-4 border-b text-center">
                                        {isSubmitted(member.id, assignment.id) ? (
                                            editingMark?.userId === member.id && editingMark?.assignmentId === assignment.id ? (
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    defaultValue={getMarkForAssignment(member.id, assignment.id)}
                                                    onBlur={(e) => handleMarkChange(member.id, assignment.id, e.target.value)}
                                                    className="w-16 p-1 border rounded text-center"
                                                />
                                            ) : (
                                                <div className="flex justify-center items-center gap-2">
                                                    <span className="mr-2 text-center">{getMarkForAssignment(member.id, assignment.id)}</span>
                                                    <FaPencilAlt
                                                        className="text-blue-500 cursor-pointer text-center"
                                                        onClick={() => handleEditClick(member.id, assignment.id)}
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            'Not Submitted'
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={handleSubmitResults}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Submit Results
            </button>
        </div>
    );
};

export default ChannelMarksAdmin;
