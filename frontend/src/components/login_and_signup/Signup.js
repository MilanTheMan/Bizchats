import React, { useState, useContext } from 'react';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        sqlService.signup({ name, email, password, role_id: 1, profile_picture: null })
            .then(data => {
                console.log(data);
                setUser(data.data);
                navigate('/home'); 
            })
            .catch(err => {
                console.log(err);
                alert("Signup Failed");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 animate-fadeIn">
            <div className="bg-[#1f2a48] shadow-xl rounded-2xl p-10 w-full max-w-lg transform scale-95 transition-all duration-300 hover:scale-100 border border-[#29375c]">
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    {/* Name Field */}
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-3 border border-[#3c4b6e] rounded-lg bg-[#2a3a5f] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 border border-[#3c4b6e] rounded-lg bg-[#2a3a5f] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-5 py-3 border border-[#3c4b6e] rounded-lg bg-[#2a3a5f] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Already Have an Account? */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">Already have an account? 
                        <a href="/login" className="text-blue-400 hover:text-blue-300 ml-1 transition-all">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
