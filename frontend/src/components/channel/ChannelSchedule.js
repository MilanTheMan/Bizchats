import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';

const ChannelSchedule = () => {
    const { channelId } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        sqlService.getChannelSchedule(channelId).then((data) => setSchedule(data.data));
    }, [channelId]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Channel Schedule</h2>
            <ul className="space-y-4">
                {schedule.map((event, index) => (
                    <li key={index} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-700">{event.description}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelSchedule;
