import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';

const ChannelMarks = () => {
    const { channelId } = useParams();
    const [marks, setMarks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marksData = await sqlService.getChannelMarks(channelId);
                const assignmentsData = await sqlService.getChannelAssignments(channelId);

                // Ensure `user.id` is correctly passed and matches the database values
                const userMarks = marksData.data.filter(mark => mark.user_id === user.id);
                console.log("Filtered User Marks:", userMarks); // Debugging: Log filtered marks

                setMarks(userMarks);
                setAssignments(assignmentsData.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [channelId, user.id]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Your Marks</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Assignment</th>
                            <th className="py-2 px-4 border-b">Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => {
                            const mark = marks.find(m => m.assignment_id === assignment.id);
                            return (
                                <tr key={assignment.id}>
                                    <td className="py-2 px-4 border-b text-center">{assignment.title}</td>
                                    <td className="py-2 px-4 border-b text-center">{mark ? mark.mark : 'Not Graded'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChannelMarks;
