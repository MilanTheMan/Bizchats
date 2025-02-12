import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png";
import { UserContext } from '../../context/UserContext';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        navigate('/');
    };

    const loggedInLinks = [
        { id: "notifications", name: "Notifications" },
        { id: "profile", name: "Profile" },
        { id: "friends", name: "Friends" },
    ];

    const loggedOffLinks = [
        { id: "login", name: "Login" },
        { id: "signup", name: "Sign Up" },
    ];

    const links = user ? loggedInLinks : loggedOffLinks;

    return (
        <header className="header">
            <Link to="/">
                <img src={Bizchats_logo} className="bizchats_logo" alt="Bizchats Logo" />
            </Link>
            <ul>
                {links.map((linksItem) => (
                    <li key={linksItem.id}>
                        <Link to={`/${linksItem.id}`} className="link_class">{linksItem.name}</Link>
                    </li>
                ))}
                {user && (
                    <li>
                        <button onClick={handleLogout} className="link_class">Logout</button>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;