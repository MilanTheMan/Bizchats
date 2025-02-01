import React, {useState, useEffect} from 'react';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function checkDetails(){
        let message = ""
        let no_problems = true

        if (email.search(/@/) == -1){
            message += `"${email}" is not a valid email.\n`
            no_problems = false
        }

        if (password != confirmPassword){
            message += "The passwords do not match."
            no_problems = false
        }

        if (password == "" && confirmPassword == ""){
            message += "Passwords can't be blank."
            no_problems = false
        }

        if (no_problems){
            alert(`We have sent you an E-Mail at "${email}" to help you set up your account. If you don't see it in your inbox, please check your junk e-mails.`)
            return true
        }
        else{
            alert(message)
            return false
        }
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value)
    }


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
                            <input type={"text"} value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className={"signup_detail"}>
                            <label>Password</label>
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange}/>
                            <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                        </div>
                        <div className={"signup_detail"}>
                            <label>Confirm Password</label>
                            <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                            <button className="show_password_button" onClick={toggleShowPassword}>Show Password</button>
                        </div>

                        <input className={"submitButton"} type={"submit"} value={"Sign Up"} onClick={checkDetails}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;