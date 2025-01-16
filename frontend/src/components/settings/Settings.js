import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

const Settings = () => {
    return(
        <div id={"settings"}>
            <h1>Settings</h1>
            <div id={"settings_categories"}>
                <div className={"settings_category"}>
                    <div className={"top"}>
                        <h2>Login Details</h2>
                    </div>
                    <div className={"related_settings"}>
                        <div className={"settings_login_detail"}>
                            <label>E-mail</label>
                            <div className={"text_and_button"}>
                                <input type={"text"}/>
                                <button>Change Email</button>
                            </div>
                        </div>
                        <div className={"settings_login_detail"}>
                            <label>Password</label>
                            <div className={"text_and_button"}>
                                <input type={"password"}/>
                                <button>Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={"settings_category"}>
                    <div className={"top"}>
                        <h2>Profile</h2>
                    </div>
                        <div className={"settings_category"}>
                            <div className={"related_settings"}>
                                <label>Public</label><input type={"checkbox"}/>
                                <label>Show Name</label><input type={"checkbox"}/>
                                <label>Show Email</label><input type={"checkbox"}/>
                                <label>Self Description</label><input type={"checkbox"}/>
                                <textarea type={"text"} className={"desc"}/>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default Settings;