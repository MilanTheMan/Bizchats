import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import sqlService from '../../services/sqlService';
import Navbar from '../navbar/Navbar';
import Header from "../header/Header";

const Mainpage = () => {
    const [channels, setChannels] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            sqlService.getUserChannels(user.id)
                .then(data => {
                    setChannels(data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    return (
        <div id={"main_page"}>
            <Navbar />
            <h1>Welcome to BizChats!</h1>
            <div className={"actual_content"}>
                <div className="class_list">
                    {channels.map(channel => (
                        <div key={channel.id} className="listed_class">
                            <img src='https://geology.com/world/world-map.gif' alt="Channel" />
                            <p>{channel.name}</p>
                        </div>
                    ))}
                </div>
                <aside className="events">
                    <h4>Events</h4>
                    <div className={"event_list"}>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">February</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Mainpage;