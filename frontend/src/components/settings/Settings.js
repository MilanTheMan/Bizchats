import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Header from "../header/Header";


const Settings = () => {
    return(
        <div id={"settings"}>
            <Header/>
            <h1>Settings</h1>
            <div id={"settings_categories"}>
                <div className={"settings_category"}>
                    <div className={"top"}>
                        <h2>Login Details</h2>
                    </div>
                    <div className={"related_settings"}>
                        <div className={"settings_login_detail"}>
                            <label>E-mail</label>
                            <div className={"label_and_input"}>
                                <input type={"text"}/>
                                <button>Change Email</button>
                            </div>
                        </div>
                        <div className={"settings_login_detail"}>
                            <label>Password</label>
                            <div className={"label_and_input"}>
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
                                <div className={"label_and_input"}>                                
                                    <label><b>Public</b></label><input type={"checkbox"}/>
                                </div>
                                <div className={"label_and_input"}>
                                    <label>Show Name</label><input type={"checkbox"}/>
                                </div>
                                <div className={"label_and_input"}>
                                    <label>Show Email</label><input type={"checkbox"}/>
                                </div>
                                <div className={"label_and_input"}>
                                    <label>Show Email</label><input type={"checkbox"}/>
                                </div>
                                <div className={"label_and_input"}>
                                    <label>Self Description</label><input type={"checkbox"}/>
                                </div>
                                

                                <textarea type={"text"} className={"desc"}/>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default Settings;