import React, {useState, useEffect} from 'react';
import HeaderLoggedOut from "../header/HeaderLoggedOut";

function Login() {
    return(
        <div id={"login_page"} className={"log_sign"}>
            <HeaderLoggedOut/>
            <div id={"login_box"}>
                <div className={"top"}>
                    <p>Login</p>
                </div>
                <div className={"login_details"}>
                    <div className={"login_detail"}>
                        <label>Username/E-mail</label>
                        <input type={"text"}/>
                    </div>
                    <div className={"login_detail"}>
                        <label>Password</label>
                        <input type={"password"}/>
                    </div>

                    <input className={"submitButton"} type={"submit"} value={"Log in"}/>
                </div>
            </div>
        </div>
    )
}

export default Login;