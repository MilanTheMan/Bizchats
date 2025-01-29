import React, { useState } from 'react';
import "./Submission.css";

const SubmissionPage = () => {
    const [comment, setComment] = useState("");
    const [fileType, setFileType] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submissionDate, setSubmissionDate] = useState(null);

    const handleSubmit = () => {
        setSubmitted(true);
        setSubmissionDate(new Date().toLocaleString());
    };

    return (
        <div className="submission-container">
            <h2>Submit Your Work</h2>
            <div className="submission-form">
                <label htmlFor="comment">Add a Comment:</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment here..."
                    className="submission-comment"
                />

                <label htmlFor="fileType">Select File Type:</label>
                <select
                    id="fileType"
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="submission-file-type"
                >
                    <option value="">--Select File Type--</option>
                    <option value="document">Document</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                </select>

                <button onClick={handleSubmit} className="submission-button">Submit</button>
            </div>

            {submitted && (
                <div className="submission-success">
                    <p>Your work has been submitted successfully!</p>
                    <p>Submission Date: {submissionDate}</p>
                </div>
            )}
        </div>
    );
};

export default SubmissionPage;
