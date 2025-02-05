import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png";
import { UserContext } from '../../context/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);

    const loggedInLinks = [
        { id: "notifications", name: "Notifications" },
        { id: "profile", name: "Profile" },
        { id: "meetings", name: "Meetings" },
        { id: "friends", name: "Friends" }, // Add Friends link
    ];

    const loggedOffLinks = [
        { id: "login", name: "Login" },
        { id: "signup", name: "Sign Up" },
    ];

    const links = user ? loggedInLinks : loggedOffLinks;

    return (
        <header className="header">
            <img src={Bizchats_logo} className="bizchats_logo" alt="Bizchats Logo" />
            <ul>
                {links.map((linksItem) => (
                    <li key={linksItem.id}>
                        <Link to={`/${linksItem.id}`} className="link_class">{linksItem.name}</Link>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;