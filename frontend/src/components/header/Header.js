import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Bizchats_logo from "../../img/bizchats_logo.png";
import { UserContext } from '../../context/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate('/');
  };

  const links = user
    ? [
        { id: "home", name: "Channels" },
        { id: "friends", name: "Friends" },
        { id: "settings", name: "Profile" },
      ]
    : [
        { id: "login", name: "Login" },
        { id: "signup", name: "Sign Up" },
      ];

  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-gradient-to-b from-blue-900 to-blue-950 shadow-md h-[60px]">
      {/* Logo */}
      <Link to="/">
        <img src={Bizchats_logo} alt="Bizchats Logo" className="h-12 w-auto" />
      </Link>

      {/* Centered user info */}
      {user && (
        <div className="flex items-center space-x-3">
          <img
            src={user.profile_picture}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-white"
          />
          <span className="text-white font-medium truncate max-w-[120px]">{user.name}</span>
        </div>
      )}

      {/* Navigation links */}
      <ul className="flex space-x-4 items-center">
        {links.map((item) => (
          <li key={item.id}>
            <Link
              to={`/${item.id}`}
              className="text-white text-lg px-4 py-2 hover:bg-white/10 border border-transparent hover:border-white rounded transition"
            >
              {item.name}
            </Link>
          </li>
        ))}

        {user && (
          <li>
            <button
              onClick={handleLogout}
              className="text-white text-lg px-4 py-2 hover:bg-white/10 border border-transparent hover:border-white rounded transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
