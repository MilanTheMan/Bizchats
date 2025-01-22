import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png"




const Footer = () => {
    return(
        <footer className="educational-footer">

<ul>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
        <li>Cookies</li>
        <li>Accessibility</li>
      </ul>
        </footer>

        

 
    )   
}

export default Footer;