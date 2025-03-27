import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';

const ChannelMarks = () => {
    const { channelId } = useParams();
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        sqlService.getChannelMarks(channelId).then((data) => setMarks(data.data));
    }, [channelId]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Marks</h2>
            <div className="space-y-4 mt-4">
                {marks.map((mark, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border">
                        <p>Assignment ID: {mark.assignment_id}</p>
                        <p>Mark: {mark.mark}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(mark.creation_date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelMarks;
