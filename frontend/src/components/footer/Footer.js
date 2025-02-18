import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png"


const Footer = () => {
    return (
        <footer className="educational-footer">
            <ul>
                <li>
                    <Link to="/info/terms_and_conditions" className="link_class white_text">Terms of conditions</Link>
                </li>
                <li>
                    <Link to="/info/privacy_policy" className="link_class white_text">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/info/cookies" className="link_class white_text">Cookies</Link>
                </li>
                <li>
                    <Link to="/info/accessibility" className="link_class white_text">Accessibility</Link>
                </li>
                <li>
                    <Link to="/index" className="link_class white_text">Index</Link>
                </li>
            </ul>
        </footer>


    )
}

export default Footer;
