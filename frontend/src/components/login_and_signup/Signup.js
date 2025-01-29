import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        sqlService.signup({ name, email, password, role_id: 1, profile_picture: null })
            .then(data => {
                console.log(data);
                setUser(data.data); // Update user context
                

                // Redirect to main page after successful signup
                navigate('/main_page');
            })
            .catch(err => {
                console.log(err);
                alert("Signup Fail");
            });
    };

    return(
        <div id={"signup_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"signup_box"}>
                    <div className={"top"}>
                        <p>Signup</p>
                    </div>
                    <div className={"signup_details"}>
                        <div className={"signup_detail"}>
                            <label>Name</label>
                            <input type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={"signup_detail"}>
                            <label>Email</label>
                            <input type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"signup_detail"}>
                            <label>Password</label>
                            <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={"signup_detail"}>
                            <label>Confirm Password</label>
                            <input type={"password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <input className={"submitButton"} type={"submit"} value={"Sign Up"} onClick={handleSignup} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
