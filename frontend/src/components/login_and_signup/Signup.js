import React, {useState, useEffect} from 'react';

function Signup() {
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
                            <input type={"password"}/>
                        </div>
                        <div className={"signup_detail"}>
                            <label>Confirm Password</label>
                            <input type={"password"}/>
                        </div>

                        <input className={"submitButton"} type={"submit"} value={"Sign Up"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;