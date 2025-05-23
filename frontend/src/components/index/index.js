import React from 'react';
import { Link } from "react-router-dom";
import './index.css';

function Test() {
    const classes = [
        { id: "c23-math", name: "C23 Math Class" },
        { id: "c24-science", name: "C24 Science Class" },
        { id: "b68-design", name: "B68 Design Class" },
    ];

    return (
        <div className="index-page">
            <ul className="link-list">
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
                    <Link to="/forgot_password" className="link_class">Forgot Password (skill issue)</Link>
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
                    <Link to="/info/terms_and_conditions" className="link_class">Terms of conditions</Link>
                </li>
                <li>
                    <Link to="/info/privacy_policy" className="link_class">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/info/cookies" className="link_class">Cookies</Link>
                </li>
                <li>
                    <Link to="/info/accessibility" className="link_class">Accessibility</Link>
                </li>
                <li>
                    <Link to="/announcements" className="link_class">Announcements</Link>
                </li>
                <li>
                    <Link to="/grades" className="link_class">grades</Link>
                </li>
                <li>
                    <Link to="/submission" className="link_class">submission</Link>
                </li>
                <li>
                    <Link to="/channel/channel" className="link_class">channel</Link>
                </li>
                <li>
                    <Link to="/channel/channel/settings" className="link_class">channels settings</Link>
                </li>
                <li>
                    <Link to="/friends" className="link_class">friends</Link>
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
                    <Link to="/profile_card" className={"link_class"}>profile card that appears when you click the pfp
                        or name of a user</Link>
                </li>
                <li>
                    <Link to="/day_card" className={"link_class"}>day card that appears when you click a day on a
                        calendar</Link>
                </li>
            </ul>
        </div>
    );
}

export default Test;