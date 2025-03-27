import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ManIpad from '../../img/ManIpad-min.jpg';
import Meeting from '../../img/Meeting-min.jpg';
import WomanShake from '../../img/WomanShake-min.jpg';

function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gray-100 min-h-[80vh] font-sans text-gray-800 flex flex-col justify-center">
      <main className="text-center px-6 md:px-20 py-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            {user ? `Welcome, ${user.name}!` : "Welcome to BizChats!"}
          </h1>
          <p className="text-md text-gray-600 mb-3">
            Your one-stop solution for communication and project management.
          </p>
          {user ? (
            <a
              href="/home"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition"
            >
              Go to Main Page
            </a>
          ) : (
            <div className="flex justify-center gap-4 mt-3">
              <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-base shadow transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-base shadow transition"
              >
                Sign Up
              </a>
            </div>
          )}
        </section>

        {/* Feature Intro + Cards */}
        <section>
          <p className="text-sm text-gray-700 mb-4 max-w-3xl mx-auto">
            BizChats helps you stay connected and productive with real-time messaging,
            organized team channels, and simple file sharing — all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              image={ManIpad}
              title="Real-time Messaging"
              description="Send and receive instant messages, no delays. Perfect for teams needing quick responses and smooth collaboration."
            />
            <FeatureCard
              image={Meeting}
              title="Channel Management"
              description="Group your conversations by topic, team, or project. Keep everything organized and easy to find."
            />
            <FeatureCard
              image={WomanShake}
              title="File Sharing"
              description="Upload, access, and share documents without leaving the chat. No more switching between platforms."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:-translate-y-1.5 transition transform">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-md font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default Homepage;
