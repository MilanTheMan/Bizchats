import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSendEmail = () => {
        if (email.includes('@')) {
            alert(`We have sent an email to "${email}" with instructions to reset your password.`);
        } else {
            alert(`"${email}" is not a valid email address.`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
                <p className="text-sm text-center text-gray-300 mb-6">
                    Enter your email address below and we’ll send you a link to reset your password.
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={handleSendEmail}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-2 rounded-lg font-semibold"
                >
                    Send Email
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
