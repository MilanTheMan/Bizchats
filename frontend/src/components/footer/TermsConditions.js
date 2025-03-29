import React from "react";

const TermsConditions = () => {
    return (
        <div className="bg-gray-100 text-gray-800 font-sans min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Terms and Conditions</h1>
                <p className="text-sm text-gray-500 mb-6">Effective Date: October 1, 2023</p>

                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By accessing or using BizChats, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform.
                </p>

                <h2 className="text-xl font-semibold mb-2">2. Use of the Platform</h2>
                <p className="mb-4">
                    You agree to use BizChats only for lawful purposes and in accordance with these Terms. You must not use the platform to:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Engage in any activity that violates applicable laws or regulations.</li>
                    <li>Transmit any harmful, offensive, or illegal content.</li>
                    <li>Interfere with the security or functionality of the platform.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
                <p className="mb-4">
                    You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access to your account.
                </p>

                <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
                <p className="mb-4">
                    All content on BizChats, including text, graphics, logos, and software, is the property of BizChats or its licensors. You may not reproduce, distribute, or create derivative works without our prior written consent.
                </p>

                <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
                <p className="mb-4">
                    We reserve the right to terminate or suspend your access to BizChats at our sole discretion, without prior notice, for any reason, including violation of these Terms.
                </p>

                <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p className="mb-4">
                    BizChats shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.
                </p>

                <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
                <p className="mb-4">
                    We may update these Terms and Conditions from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the platform constitutes acceptance of the revised terms.
                </p>

                <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Email: support@bizchats.com</li>
                    <li>Phone: +1-800-123-4567</li>
                    <li>Address: 123 BizChats Lane, Toronto, ON, Canada</li>
                </ul>

                <p className="text-sm text-gray-500">By using BizChats, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.</p>
            </div>
        </div>
    );
};

export default TermsConditions;
