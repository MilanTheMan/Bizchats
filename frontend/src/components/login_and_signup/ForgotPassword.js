import React, {useState, useEffect} from 'react';

function ForgotPassword() {

    const [email, setEmail] = useState("");

    function handleSendEmail(){
        if (email.search(/@/) != -1){
            alert(`We have sent you an E-Mail at "${email}" to reset your password. If you don't see it in your inbox, please check your junk e-mails.`)
        }
        else{
            alert(`"${email}" is not a valid email.`)
        }


    }

    function handleChange(event){
        setEmail(event.target.value)
    }

    return(
        <div id={"forgot_password_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"login_box"}>

                    <div className={"top"}>
                        <p>Forgot Password?</p>
                    </div>

                    <div className={"box_content"}>

                        <div className={"login_details"}>
                            <div className={"login_detail"}>
                                <p>Put your email in the box below, then we will send you an email to help you reset
                                    your
                                    password.</p>
                                <label id={"email"}>Username/E-mail</label>
                                <input type={"text"} value={email} onChange={handleChange}/>
                            </div>
                            <input className={"submitButton"} type={"submit"} value={"Send E-Mail"}
                                   onClick={handleSendEmail}/>
                        </div>
                        <aside className={"forgot"}>

                        </aside>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ForgotPassword;