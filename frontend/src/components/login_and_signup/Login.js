import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null); // Store captcha value
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
                console.log(data);
                setUser(data.data);
                navigate('/home');
            })
            .catch(err => {
                console.log(err);
                alert("Login failed!");
            });
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Store the value returned by reCAPTCHA
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 animate-fadeIn">
            <div className="bg-[#1f2a48] shadow-xl rounded-2xl p-10 w-full max-w-lg transform scale-95 transition-all duration-300 hover:scale-100 border border-[#29375c]">
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 border border-[#3c4b6e] rounded-lg bg-[#2a3a5f] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 border border-[#3c4b6e] rounded-lg bg-[#2a3a5f] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-sm text-gray-300 hover:text-white transition-all"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right mb-6">
                        <Link to="/forgot_password" className="text-gray-400 hover:text-white transition-all text-sm">
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Google reCAPTCHA Widget */}
                    <div className="mb-6">
                        <ReCAPTCHA
                            sitekey="6LcMH_8qAAAAAIZGbzjDfe-rXqqG8hBzVfbZmnvI"  // site key
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Log in
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">Don't have an account? 
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 ml-1 transition-all">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
