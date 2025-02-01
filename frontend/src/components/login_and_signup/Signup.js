import React, {useState, useEffect} from 'react';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }

    return(
        <div id={"signup_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"signup_box"}>
                    <div className={"top"}>
                        <p>Signup</p>
                    </div>
                    <div className={"signup_details"}>
                        <div className={"signup_detail"}>
                            <label>Username/E-mail</label>
                            <input type={"text"}/>
                        </div>
                        <div className={"signup_detail"}>
                            <label>Password</label>
                            <input type={showPassword ? 'text' : 'password'}/>
                            <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                        </div>
                        <div className={"signup_detail"}>
                            <label>Confirm Password</label>
                            <input type={showPassword ? 'text' : 'password'}/>
                            <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                        </div>

                        <input className={"submitButton"} type={"submit"} value={"Sign Up"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;