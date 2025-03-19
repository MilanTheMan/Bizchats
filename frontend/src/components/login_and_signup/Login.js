import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
//import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        sqlService.login({ email, password })
            .then(data => {
                console.log(data);
                setUser(data.data); // Update user context
                navigate('/home'); // Redirect to main page
            })
            .catch(err => {
                console.log(err);
                alert("Fail");
            });
    };

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }

    return (
        <div id={"login_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"login_box"}>
                    <div className={"top"}>
                        <p>Login</p>
                    </div>
                    <div className={"box_content"}>
                        <div className={"login_details"}>
                            <div className={"login_detail"}>
                                <label>Email</label>
                                <input type={"text"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className={"login_detail"}>
                                <label>Password</label>
                                <input type={showPassword ? 'text' : 'password'} value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <button className="show_password_button" onClick={toggleShowPassword}>Show Password
                                </button>
                                <Link to={"/forgot_password"}>Forgot your password?</Link>
                            </div>
                            <input className={"submitButton"} type={"submit"} value={"Log in"} onClick={handleLogin}/>
                        </div>
                        <aside className={"login"}>

                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;