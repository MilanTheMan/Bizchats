import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ManIpad from '../../img/ManIpad-min.jpg';
import Meeting from '../../img/Meeting-min.jpg';
import WomanShake from '../../img/WomanShake-min.jpg';

function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gray-100 min-h-[80vh] font-sans text-gray-800">
      <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 max-w-[1600px] mx-auto">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-blue-800">Welcome to BizChats!</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
            BizChats is your all-in-one platform for seamless communication, team coordination,
            and secure file sharing. Empower your team with real-time tools built for productivity.
          </p>
        </section>

        {/* Features Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              image={ManIpad}
              title="Real-time Messaging"
              description="Collaborate effortlessly using instant chat features. Whether you're in the office or remote, our platform keeps your team in sync and responsive."
            />
            <FeatureCard
              image={Meeting}
              title="Channel Management"
              description="Organize conversations by topic, team, or task. Channels ensure you never miss critical updates and keep communication tidy and efficient."
            />
            <FeatureCard
              image={WomanShake}
              title="File Sharing"
              description="Upload, preview, and share files securely—without leaving your workspace. Ideal for quick hand-offs and streamlined collaboration."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1.5 p-5 flex flex-col h-full">
      <div className="aspect-video overflow-hidden rounded-md mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-blue-700">{title}</h3>
      <p className="text-sm text-gray-600 flex-grow">{description}</p>
    </div>
  );
}

export default Homepage;
