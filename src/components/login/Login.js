import React, {useState, useEffect} from 'react';

function Login() {
    return(
        <div id={"login_page"}>
            <div id={"login_box"}>
                <div className={"top"}>
                    <p>Login</p>
                </div>
                <div className={"bottom_thing"}>
                    <label>Username/E-mail</label>
                    <input type={"text"}/>
                    <label>Password</label>
                    <input type={"password"}/>
                </div>
            </div>
        </div>
    )
}

export default Login;