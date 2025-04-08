import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ChannelSchedule.css';

const ChannelSchedule = () => {
    const { channelId } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchEvents();
    }, [channelId]);

    const fetchEvents = async () => {
        try {
            const data = await sqlService.getChannelEvents(channelId);
            // Normalize event_date to remove time component
            const normalizedEvents = data.data.map(event => ({
                ...event,
                event_date: new Date(event.event_date).toISOString().split('T')[0],
            }));
            setEvents(normalizedEvents);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const eventData = {
                channelId,
                title: newEvent.title,
                description: newEvent.description,
                event_date: selectedDate.toISOString().split('T')[0],
            };
            await sqlService.createChannelEvent(eventData);
            setNewEvent({ title: '', description: '' });
            fetchEvents();
        } catch (err) {
            console.error("Failed to create event:", err);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await sqlService.deleteChannelEvent({ eventId });
            fetchEvents();
        } catch (err) {
            console.error("Failed to delete event:", err);
        }
    };

    const eventsForSelectedDate = events.filter(
        (event) => event.event_date === selectedDate.toISOString().split('T')[0]
    );

    return (
        <div className="channel-schedule">
            <h2 className="text-xl font-semibold mb-4 text-center">Channel Schedule</h2>
            <div className="schedule-container">
                {/* Create Event Form */}
                <div className="create-event">
                    <h3 className="text-lg font-semibold mb-2">Create New Event</h3>
                    <form onSubmit={handleCreateEvent} className="bg-white p-4 rounded-lg shadow">
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            required
                        />
                        <textarea
                            placeholder="Event Description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Create Event
                        </button>
                    </form>
                </div>

                {/* Calendar */}
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="react-calendar"
                    />
                </div>

                {/* Events for the Day */}
                <div className="events-for-day">
                    <h3 className="text-lg font-semibold mb-2">Events for {selectedDate.toDateString()}</h3>
                    <ul>
                        {eventsForSelectedDate.length > 0 ? (
                            eventsForSelectedDate.map((event) => (
                                <li key={event.id}>
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                    <div className="event-actions">
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No events for this day.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChannelSchedule;
