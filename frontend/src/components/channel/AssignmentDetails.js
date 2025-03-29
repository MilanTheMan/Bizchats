import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaTimes, FaCheckCircle } from "react-icons/fa";

const AssignmentDetails = () => {
    const { channelId, assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [comments, setComments] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [submission, setSubmission] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        sqlService.getChannelAssignments(channelId).then((data) => {
            const assignment = data.data.find(a => a.id === parseInt(assignmentId));
            setAssignment(assignment);
        });

        sqlService.getSubmissionDetails(user.id, assignmentId).then((data) => {
            if (data.data.length > 0) {
                setSubmission(data.data[0]);
            }
        });
    }, [channelId, assignmentId, user.id]);

    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };

    const handleFileChange = (e) => {
        setAttachments([...attachments, ...e.target.files]);
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadPromises = attachments.map(file => {
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onloadend = () => {
                        const base64 = reader.result.split(',')[1];
                        const fileType = file.type.split('/')[1];
                        sqlService.uploadAttachment({ base64, fileType, userId: user.id, channelId, assignmentId })
                            .then(resolve)
                            .catch(reject);
                    };
                    reader.readAsDataURL(file);
                });
            });

            await Promise.all(uploadPromises);

            await sqlService.addComment({ userId: user.id, channelId, assignmentId, comments });

            alert('Submission successful');
            setComments('');
            setAttachments([]);
            sqlService.getSubmissionDetails(user.id, assignmentId).then((data) => {
                if (data.data.length > 0) {
                    setSubmission(data.data[0]);
                }
            });
        } catch (err) {
            console.log(err);
            alert('Failed to submit. Please try again.');
        }
    };

    if (!assignment) {
        return <div className="text-center text-gray-600 text-lg">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-[80vh] p-8">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4">{assignment.title}</h2>
                <p className="text-gray-700 mb-4">{assignment.description}</p>
                <p className="text-sm text-gray-500 mb-4">Due: {new Date(assignment.due_date).toLocaleString()}</p>
                {submission ? (
                    <div className="text-center">
                        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                        <p className="text-lg text-gray-700">You have submitted this assignment.</p>
                        <p className="text-gray-700 mt-4"><strong>Comments:</strong> {submission.comments}</p>
                        {submission.attachment_link && (
                            <div className="mt-4">
                                <a href={submission.attachment_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Attachment</a>
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={comments}
                            onChange={handleCommentChange}
                            placeholder="Add your comments"
                            required
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                        <div className="space-y-2">
                            {attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded">
                                    <span>{file.name}</span>
                                    <FaTimes className="text-red-500 cursor-pointer" onClick={() => handleRemoveAttachment(index)} />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AssignmentDetails;
