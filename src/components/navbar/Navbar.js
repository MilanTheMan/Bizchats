import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

const Navbar = () => {

    const ref = useRef();
    useEffect(()=>{
        ref.current.style.width = "547px";
        ref.current.style.width = "154px";
    });

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