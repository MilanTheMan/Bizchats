import React from 'react';
import { Link } from "react-router-dom";
import Footer from "../footer/Footer"
import Header from "../header/Header";
import HeaderLoggedOut from "../header/HeaderLoggedOut";

function Test() {
    const classes = [
        { id: "c23-math", name: "C23 Math Class" },
        { id: "c24-science", name: "C24 Science Class" },
        { id: "b68-design", name: "B68 Design Class" },
    ];

    return (
        <div>
            <ul>
                <li>
                    <Link to="/homepage" className="link_class">Homepage</Link>
                </li>
                <li>
                    <Link to="/login" className="link_class">Log In</Link>
                </li>
                <li>
                    <Link to="/signup" className="link_class">Sign Up</Link>
                </li>
                <li>
                    <Link to="/main_page" className="link_class">Main Page</Link>
                </li>
                <li>
                    <Link to="/settings" className="link_class">Settings</Link>
                </li>
                <li>
                    <Link to="/schedule" className="link_class">Sched</Link>
                </li>
                <li>
                    <Link to="/home" className="link_class">Home Page</Link>
                </li>
                <li>
                    <Link to="/personal" className="link_class">Personal Use</Link>
                </li>
                <li>
                    <Link to="/educational" className="link_class">Educational Use</Link>
                </li>
                <li>
                    <Link to="/professional" className="link_class">Professional Use</Link>
                </li>
                <li>
                    <Link to="/announcements" className="link_class">Announcements</Link>
                </li>
                <li>
                    <Link to="/grades" className="link_class">Grades</Link>
                </li>
                <li>
                    <Link to="/submission" className="link_class">Submission Page</Link>
                </li>


                
                <li>
                    <h3>Classes:</h3>
                    <ul>
                        {classes.map((classItem) => (
                            <li key={classItem.id}>
                                <Link to={`/class/${classItem.id}`} className="link_class">
                                    {classItem.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <Link to="/*" className={"link_class"}>not found page</Link>
                </li>


                <li>
                    <Link to="/profile_card" className={"link_class"}>profile card that appears when you click the pfp or name of a user</Link>
                </li>

                <li>
                    <Link to="/day_card" className={"link_class"}>day card that appears when you click a day on a calendar</Link>
                </li>
            </ul>
        </div>
    );
}

export default Test;