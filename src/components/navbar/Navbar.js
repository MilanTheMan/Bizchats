import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

const Navbar = () => {

    const ref = useRef();

    return(
        <nav id={"navbar"}>
            <div className={"bizchats_logo"} ref={ref}/>
            <ul>
                <li>
                    <Link to="/Login" className={"link_class"}>Log In</Link>
                </li>
                <li>
                    <Link to="/Signup" className={"link_class"}>Sign Up</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;