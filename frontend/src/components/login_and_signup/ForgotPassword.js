import React, {useState, useEffect} from 'react';

function ForgotPassword() {
    return(
        <div id={"forgot_password_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"login_box"}>
                    <div className={"top"}>
                        <p>Forgot Password?</p>
                    </div>
                    <p>Put your email in the box below, then we will send you an email to help you reset your password.</p>
                    <div className={"login_details"}>
                        <div className={"login_detail"}>
                            <label>Username/E-mail</label>
                            <input type={"text"}/>
                        </div>

                        <input className={"submitButton"} type={"submit"} value={"Send E-Mail"}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword;