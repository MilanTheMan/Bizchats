import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-100 text-gray-800 font-sans min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-6">Effective Date: October 1, 2023</p>

                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p className="mb-4">
                    Welcome to BizChats (“we,” “our,” or “us”). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy applies to our app, BizChats, designed for business and educational usage. By using our app, you agree to the collection and use of information in accordance with this policy.
                </p>

                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>Personal Information:</strong> Includes your name, email address, phone number, and other details provided during registration.</li>
                    <li><strong>Business Information:</strong> If using the app for business purposes, we may collect business-related data such as business name and address.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our app, including features used and timestamps.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> Used to monitor activity and store certain information. You can manage cookies through your browser settings.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information collected to provide, maintain, and improve our services, as well as to communicate with you and ensure the security of our platform.
                </p>

                <h2 className="text-xl font-semibold mb-2">4. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update our Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Please review this policy periodically for updates.
                </p>

                <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Email: support@bizchats.com</li>
                    <li>Phone: +1-800-123-4567</li>
                    <li>Address: 123 BizChats Lane, Toronto, ON, Canada</li>
                </ul>

                <p className="text-sm text-gray-500">By using BizChats, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
