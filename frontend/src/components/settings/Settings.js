import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import sqlService from '../../services/sqlService';
import { Outlet, Link } from 'react-router-dom';
import Header from "../header/Header";
import FriendsPage from "../friends/FriendsPage";
import './style.css';

const Settings = () => {
    const { user, setUser } = useContext(UserContext);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');

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
        sqlService.updateProfilePicture({ userId: user.id, profilePicture })
            .then(data => {
                setUser({ ...user, profile_picture: data.profilePictureUrl });
                alert("Profile picture updated successfully");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update profile picture");
            });
    };

    const handleUpdateEmail = () => {
        sqlService.updateUserEmail({ userId: user.id, newEmail })
            .then(() => {
                setUser({ ...user, email: newEmail });
                alert("Email updated successfully");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to update email");
            });
    };

    const handleResetPassword = () => {
        sqlService.resetUserPassword({ userId: user.id, newPassword })
            .then(() => {
                alert("Password reset successfully");
            })
            .catch(err => {
                console.log(err);
                alert("Failed to reset password");
            });
    };

    return (
        <div id="settings">
            <h1>Settings</h1>
            <div id="settings_categories">
                <div className="settings_category">
                    <div className="top">
                        <h2>Login Details</h2>
                    </div>
                    <div className="related_settings">
                        <div className="settings_login_detail">
                            <label>E-mail</label>
                            <div className="label_and_input">
                                <input type="text" value={currentEmail} readOnly />
                                <input type="text" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                <button onClick={handleUpdateEmail}>Change Email</button>
                            </div>
                        </div>
                        <div className="settings_login_detail">
                            <label>Reset Password</label>
                            <div className="label_and_input">
                                <input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                                <button onClick={handleResetPassword}>Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="settings_category">
                    <div className="top">
                        <h2>Profile Picture</h2>
                    </div>
                    <div className="related_settings">
                        <div className="settings_login_detail">
                            <label>Current Profile Picture</label>
                            <div className="label_and_input">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                ) : (
                                    <p>No profile picture</p>
                                )}
                                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                                <button onClick={handleProfilePictureUpload}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
                <FriendsPage/>
            </div>
        </div>
    );
};

export default Settings;