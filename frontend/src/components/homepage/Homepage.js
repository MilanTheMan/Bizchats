import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ManIpad from '../../img/ManIpad-min.jpg';
import Meeting from '../../img/Meeting-min.jpg';
import WomanShake from '../../img/WomanShake-min.jpg';

function Homepage() {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
            <main className="text-center px-6 md:px-20 py-16">
                {/* Welcome Section */}
                <section className="mb-20">
                    <h1 className="text-4xl font-bold mb-4">
                        {user ? `Welcome, ${user.name}!` : "Welcome to BizChats!"}
                    </h1>
                    <p className="text-lg mb-8 text-gray-600">
                        Your one-stop solution for communication and project management.
                    </p>
                    {user ? (
                        <a
                            href="/home"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-lg shadow-md transition"
                        >
                            Go to Main Page
                        </a>
                    ) : (
                        <div className="flex justify-center gap-6">
                            <a
                                href="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg shadow transition"
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg shadow transition"
                            >
                                Sign Up
                            </a>
                        </div>
                    )}
                </section>

                {/* Features Section */}
                <section>
                    <h2 className="text-3xl font-semibold mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:-translate-y-2 transition transform">
                            <img
                                src={ManIpad}
                                alt="Real-time Messaging"
                                className="w-full h-56 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
                            <p className="text-gray-600">
                                Communicate with your team in real-time.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:-translate-y-2 transition transform">
                            <img
                                src={Meeting}
                                alt="Channel Management"
                                className="w-full h-56 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Channel Management</h3>
                            <p className="text-gray-600">
                                Create and join channels to organize your conversations.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:-translate-y-2 transition transform">
                            <img
                                src={WomanShake}
                                alt="File Sharing"
                                className="w-full h-56 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">File Sharing</h3>
                            <p className="text-gray-600">
                                Share files and documents with your team.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Homepage;
