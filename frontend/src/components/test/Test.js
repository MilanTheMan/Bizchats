import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Test(){
    return(
        <div>
            <ul>
                <li>
                    <Link to="/login" className={"link_class"}>Log In</Link>
                </li>
                <li>
                    <Link to="/signup" className={"link_class"}>Sign Up</Link>
                </li>
                <li>
                    <Link to="/main_page" className={"link_class"}>Main Page</Link>
                </li>
                <li>
                    <Link to="/settings" className={"link_class"}>Settings</Link>
                </li>
            </ul>
        </div>
    )
}

export default Test;