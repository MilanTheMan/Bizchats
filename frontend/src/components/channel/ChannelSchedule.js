import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS
import './ChannelSchedule.css'; // Import custom styles for the calendar

const ChannelSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="channel-schedule">
            <h2 className="text-xl font-semibold mb-4 text-center">Channel Schedule</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="react-calendar"
                />
            </div>
            {/* <div className="selected-date">
                <h3 className="text-lg font-semibold">Selected Date:</h3>
                <p>{selectedDate.toDateString()}</p>
            </div> */}
        </div>
    );
};

export default ChannelSchedule;
