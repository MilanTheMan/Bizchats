import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        sqlService.login({ email, password, captcha: captchaValue })
            .then(data => {
                setUser(data.data);
                navigate('/home');
            })
            .catch(() => alert("Login failed!"));
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-[80vh] bg-gray-200 text-white">
            <div className="w-full max-w-md bg-gradient-to-br from-[#1f2a48] to-[#243765] shadow-2xl rounded-2xl px-10 py-12 mx-4">
                <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-[#2a3a5f] text-white border border-[#3c4b6e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg bg-[#2a3a5f] text-white border border-[#3c4b6e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-sm text-gray-300 hover:text-white"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to="/forgot_password" className="text-sm text-gray-400 hover:text-white">
                            Forgot your password?
                        </Link>
                    </div>

                    <ReCAPTCHA
                        sitekey="6LcMH_8qAAAAAIZGbzjDfe-rXqqG8hBzVfbZmnvI"
                        onChange={handleCaptchaChange}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition-all"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-400">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-400 hover:text-blue-300 ml-1">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
