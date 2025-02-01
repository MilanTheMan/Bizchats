import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }


    return(
        <div id={"login_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
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
                            <input type={showPassword ? 'text' : 'password'}/>
                            <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                            <Link to={"/forgot_password"}>Forgot your password?</Link>
                        </div>

                        <input className={"submitButton"} type={"submit"} value={"Log in"}/>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login;