import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-900 to-blue-950 text-white text-sm fixed bottom-0 left-0 px-4 py-2 z-50">
      <div className="flex justify-center space-x-4">
        <Link to="/info/terms_and_conditions" className="hover:text-blue-300 transition">
          Terms & Conditions
        </Link>
        <Link to="/info/privacy_policy" className="hover:text-blue-300 transition">
          Privacy Policy
        </Link>
        <Link to="/info/cookies" className="hover:text-blue-300 transition">
          Cookies
        </Link>
        <Link to="/info/accessibility" className="hover:text-blue-300 transition">
          Accessibility
        </Link>
        <Link to="/index" className="hover:text-blue-300 transition">
          Index
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
