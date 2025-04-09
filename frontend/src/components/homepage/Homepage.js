import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import ManIpad from '../../img/ManIpad-min.jpg';
import Meeting from '../../img/Meeting-min.jpg';
import WomanShake from '../../img/WomanShake-min.jpg';
import Bizchats_logo from '../../img/bizchats_logo.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function Homepage() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Empower Your Team with BizChats
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            All-in-one platform for team communication, collaboration, and productivity.
          </motion.p>
          <motion.a
            href="/signup"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-100 transition"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Get Started Now
          </motion.a>
        </div>
      </section>

      {/* Trusted By */}
      {/* <section className="bg-gray-50 py-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">Trusted by teams at</p>
        <div className="flex justify-center gap-10 flex-wrap">
          <img src={Bizchats_logo} alt="BizChats" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_2015_logo.svg" alt="Google" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Meta" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8" />
        </div>
      </section> */}

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            image={ManIpad}
            title="Real-time Messaging"
            description="Instant chat that keeps your team connected across departments and time zones."
            delay={1}
          />
          <FeatureCard
            image={Meeting}
            title="Channel Management"
            description="Structure communication with channels dedicated to topics, teams, or projects."
            delay={2}
          />
          <FeatureCard
            image={WomanShake}
            title="File Sharing"
            description="Easily upload, view, and share files right in your chat—no extra tools required."
            delay={3}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-blue-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: 'Alex Johnson',
                title: 'Project Manager, Techify',
                text: 'BizChats has revolutionized how our teams communicate. Channels and messaging are seamless!',
              },
              {
                name: 'Sophia Lee',
                title: 'CTO, InnovateX',
                text: 'The real-time messaging and built-in file sharing saved us from a dozen different apps.',
              },
              {
                name: 'Marcus Chan',
                title: 'Design Lead, BoldPixel',
                text: 'Super intuitive, reliable, and fast. We switched in a day and haven’t looked back.',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-lg shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i + 1}
              >
                <p className="italic text-gray-700 mb-4">“{t.text}”</p>
                <p className="font-semibold text-blue-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Team Communication?</h2>
        <p className="text-lg mb-8 text-blue-100">Join thousands of users already using BizChats daily.</p>
        <a
          href="/signup"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
}

function FeatureCard({ image, title, description, delay }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-2 p-6 flex flex-col h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      custom={delay}
    >
      <div className="aspect-video overflow-hidden rounded-md mb-5">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

export default Homepage;
