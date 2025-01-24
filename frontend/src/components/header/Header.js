import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png"
import signup from "../login_and_signup/Signup";

const Header = () => {

    const ref = useRef();

    const [loggedIn, setLoggedIn] = useState(false)

    const loggedInLinks = [
        {id: "notifications", name: "Notifications"},
        {id: "profile", name: "Profile"},
        {id: "meetings", name: "Meetings"},
    ]

    const loggedOffLinks = [
        {id: "login", name: "Login"},
        {id: "signup", name: "Sign Up"},
    ]

    let links = loggedOffLinks;
    if (loggedIn){
        links = loggedInLinks;
    }

    return(
        <header class={"header"}>
            <img src={Bizchats_logo} className={"bizchats_logo"}/>

            <ul>
                {links.map((linksItem) => (
                    <li key={linksItem.id}>
                        <Link to={`/${linksItem.id}`} className={"link_class"}>{linksItem.name}</Link>
                    </li>
                ))}
                {/*
                <li>
                    <Link to="/Notifications" className={"link_class"}>Notifications</Link>
                </li>
                <li>
                    <Link to="/Profile" className={"link_class"}>Profile</Link>
                </li>
                <li>
                    <Link to="/Meetings" className={"link_class"}>Meetings</Link>
                </li>

                */}
            </ul>
        </header>
    )
}

export default Header;