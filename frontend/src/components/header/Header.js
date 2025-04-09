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
        { id: "", name: "About" },
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
      <Link to="/">
        <img src={Bizchats_logo} alt="Bizchats Logo" className="h-12 w-auto" />
      </Link>
      <ul className="flex space-x-4">
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
