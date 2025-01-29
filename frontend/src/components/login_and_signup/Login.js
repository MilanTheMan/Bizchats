import React, { useState } from 'react';
import sqlService from '../../services/sqlService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        sqlService.login({ email, password })
            .then(data => {
                console.log(data);
                // Handle successful login
                alert("Success");
            })
            .catch(err => {
                console.log(err);
                // Handle login error
                alert("Fail");
            });
    };

    return (
        <div id={"login_page"} className={"log_sign"}>
            <div className={"log_sign_content"}>
                <div id={"login_box"}>
                    <div className={"top"}>
                        <p>Login</p>
                    </div>
                    <div className={"login_details"}>
                        <div className={"login_detail"}>
                            <label>Username/E-mail</label>
                            <input type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"login_detail"}>
                            <label>Password</label>
                            <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input className={"submitButton"} type={"submit"} value={"Log in"} onClick={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;