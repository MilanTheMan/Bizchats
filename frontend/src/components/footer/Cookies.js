import React from "react";

const Cookies = () => {
    return (
        <div className="bg-gray-100 text-gray-800 font-sans min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Cookie Policy</h1>
                <p className="text-sm text-gray-500 mb-6">Effective Date: October 1, 2023</p>

                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p className="mb-4">
                    This Cookie Policy explains how BizChats (“we,” “our,” or “us”) uses cookies and similar technologies on our app. By using BizChats, you agree to the use of cookies in accordance with this policy.
                </p>

                <h2 className="text-xl font-semibold mb-2">2. What Are Cookies?</h2>
                <p className="mb-4">
                    Cookies are small text files stored on your device when you visit a website or use an app. They help improve functionality and provide insights into usage patterns.
                </p>

                <h2 className="text-xl font-semibold mb-2">3. How We Use Cookies</h2>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>Essential Cookies:</strong> Necessary for the app to function properly.</li>
                    <li><strong>Performance Cookies:</strong> Analyze app usage and track performance.</li>
                    <li><strong>Functional Cookies:</strong> Remember user preferences for a personalized experience.</li>
                    <li><strong>Analytics Cookies:</strong> Collect data to improve our services.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">4. Managing Cookies</h2>
                <p className="mb-4">
                    You can manage your cookie preferences through your browser settings. Note that disabling cookies may impact your experience on our app.
                </p>

                <h2 className="text-xl font-semibold mb-2">5. Changes to This Cookie Policy</h2>
                <p className="mb-4">
                    We may update this Cookie Policy periodically. Changes will be posted on this page with an updated effective date.
                </p>

                <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about our Cookie Policy, please contact us:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Email: support@bizchats.com</li>
                    <li>Phone: +1-800-123-4567</li>
                    <li>Address: 123 BizChats Lane, Toronto, ON, Canada</li>
                </ul>

                <p className="text-sm text-gray-500">By using BizChats, you acknowledge that you have read and understood this Cookie Policy and agree to its terms.</p>
            </div>
        </div>
    );
};

export default Cookies;
