import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

const Settings = () => {
    return(
        <div id={"settings"}>
            <h1>Settings</h1>
            <div id={"settings_categories"}>
                <div id={"settings_login_details"}>
                    <h2>Login Details</h2>
                    <div className={"settings_login_detail"}>
                        <label>E-mail</label>
                        <input type={"text"}/>
                        <button>Change Email</button>
                    </div>
                    <div className={"settings_login_detail"}>
                        <label>Password</label>
                        <input type={"password"}/>
                        <button>Change Password</button>
                    </div>
                </div>
                <div id={"settings_profile"}>
                    <h2>Profile</h2>
                    <label>Public</label><input type={"checkbox"}/>
                    <label>Show Name</label><input type={"checkbox"}/>
                    <label>Show Email</label><input type={"checkbox"}/>
                    <label>Self Description</label><input type={"checkbox"}/>
                    <textarea type={"text"}/>
                </div>
            </div>
        </div>
    )
}

export default Settings;