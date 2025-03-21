import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import sqlService from "../../services/sqlService";
import FriendsPage from "../friends/FriendsPage";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentEmail, setCurrentEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (user) {
      setCurrentEmail(user.email);
      setProfilePicture(user.profile_picture);
    }
  }, [user]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePictureUpload = () => {
    sqlService
      .updateProfilePicture({ userId: user.id, profilePicture })
      .then((data) => {
        setUser({ ...user, profile_picture: data.profilePictureUrl });
        alert("Profile picture updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update profile picture");
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Settings Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Login Details */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Login Details</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">E-mail</label>
            <input type="text" value={currentEmail} readOnly className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded-lg text-white">Change Email</button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Reset Password</label>
            <input type={showPassword ? "text" : "password"} className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            <button onClick={toggleShowPassword} className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 transition p-2 rounded-lg text-white">Show Password</button>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input type="password" className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            <button className="mt-2 w-full bg-green-500 hover:bg-green-600 transition p-2 rounded-lg text-white">Change Password</button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-400" />
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="w-full p-2 bg-gray-700 rounded-lg text-white" />
          <button onClick={handleProfilePictureUpload} className="mt-2 w-full bg-purple-500 hover:bg-purple-600 transition p-2 rounded-lg text-white">
            Upload
          </button>
        </div>
      </div>

      {/* Friends Section */}
      <div className="mt-6 w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Friends</h2>

        {/* Friends List Expands Within Scrollable Page */}
        <div className="w-full">
          <FriendsPage />
        </div>
      </div>
    </div>
  );
};

export default Settings;
