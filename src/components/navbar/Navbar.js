import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

//todo: this has been written on 2025-01-15, later in the development of this application, make this dynamic.
const Navbar = () => {
    return(
        <nav class={"navbar"}>
            <ul>
                <li>
                    <Link to="https://www.google.ca/" className={"link_class"}>Channels</Link>
                </li>
                <li>
                    <Link to="https://www.google.ca/" className={"link_class"}>Schedule</Link>
                </li>
                <li>
                    <Link to="https://www.google.ca/" className={"link_class"}>Meetings</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;