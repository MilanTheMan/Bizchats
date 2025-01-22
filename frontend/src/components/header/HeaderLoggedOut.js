import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png"

const HeaderLoggedOut = () => {

    const ref = useRef();

    return(
        <header class={"header"}>
            <img src={Bizchats_logo} className={"bizchats_logo"}/>

            <ul>
                <li>
                    <Link to="/Login" className={"link_class"}>Log In</Link>
                </li>
                <li>
                    <Link to="/Signup" className={"link_class"}>Sign Up</Link>
                </li>
            </ul>
        </header>
    )
}

export default HeaderLoggedOut;