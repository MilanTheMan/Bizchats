import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="educational-footer">
            <ul>
                <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>
        </footer>
        
    );  
};

export default Footer;
