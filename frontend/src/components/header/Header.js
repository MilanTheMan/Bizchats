import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png"

const Header = () => {

    const ref = useRef();

    return(
        <header class={"header"}>
            <img src={Bizchats_logo} className={"bizchats_logo"}/>

            <ul>
                <li>
                    <Link to="/Classes" className={"link_class"}>Notifications</Link>
                </li>
                <li>
                    <Link to="/Schedule" className={"link_class"}>Profile</Link>
                </li>
                <li>
                    <Link to="/Meetings" className={"link_class"}>Meetings</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;