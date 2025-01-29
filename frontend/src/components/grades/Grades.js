import React from 'react';
import "./Grades.css";

const Grades = () => {
    // Placeholder grade data
    const grades = [
        { course: "Mathematics", percentage: "92%", grade: "A" },
        { course: "Science", percentage: "85%", grade: "B" },
        { course: "History", percentage: "78%", grade: "C" },
        { course: "English", percentage: "88%", grade: "B+" },
        { course: "Art", percentage: "95%", grade: "A+" }
    ];

    return (
        <div className="grades-container">
            <h2>Grades</h2>
            <table className="grades-table">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Percentage</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.course}</td>
                            <td>{grade.percentage}</td>
                            <td>{grade.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grades;