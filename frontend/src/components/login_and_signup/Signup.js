import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!captchaValue) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        sqlService.signup({ name, email, password, role_id: 1, profile_picture: null, captcha: captchaValue })
            .then(data => {
                setUser(data.data);
                navigate('/home');
            })
            .catch(() => alert("Signup Failed"));
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-[90vh] bg-gray-200 text-white">
            <div className="w-full max-w-lg bg-gradient-to-br from-[#1f2a48] to-[#243765] shadow-2xl rounded-2xl px-10 py-12 mx-4">
                <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-lg bg-[#2a3a5f] text-white border border-[#3c4b6e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg bg-[#2a3a5f] text-white border border-[#3c4b6e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 rounded-lg bg-[#2a3a5f] text-white border border-[#3c4b6e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <ReCAPTCHA
                        sitekey="6LcMH_8qAAAAAIZGbzjDfe-rXqqG8hBzVfbZmnvI"
                        onChange={handleCaptchaChange}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-400">
                    Already have an account?
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 ml-1">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
