import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login_and_signup/Login";
import Signup from './components/login_and_signup/Signup';
import "./components/login_and_signup/style.css";

import HomePage from './components/home/HomePage';

import PersonalUse from "./components/personal/PersonalUse";

import Educational from "./components/educational/Educational";

import Professional from "./components/professional/Professional";

import ClassPage from "./components/class/ClassPage";

import Announcements from './components/announcements/Announcments';

import Grades from "./components/grades/Grades";

import Submission from "./components/submission/Submission";


import Header from "./components/header/Header";
import "./components/header/style.css";

import Footer from "./components/footer/Footer";
import "./components/footer/style.css"

import Mainpage from './components/mainpage/Mainpage';
import "./components/mainpage/style.css";

import Settings from "./components/settings/Settings";
import "./components/settings/style.css";

import Schedule from './components/schedule/Schedule';
import "./components/schedule/style.css"

import NotFound from './components/notfound/notfound';
import "./components/notfound/style.css"

import Navbar from './components/navbar/Navbar';
import "./components/navbar/style.css";

import Homepage from './components/homepage/Homepage';
import "./components/homepage/Homepage.css"

import TermsConditions from "./components/footer/TermsConditions";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import Cookies from "./components/footer/Cookies";
import Accessibility from "./components/footer/Accessibility";

// not sites
import ProfileCard from "./components/profile_card/ProfileCard";
import Daycard from './components/schedule/popup/Daycard';
import "./components/schedule/popup/style.css"

//testing purposes
import Test from "./components/test/Test";

import React from 'react';
import { UserProvider } from './context/UserContext';
import ChannelPage from './components/channel/ChannelPage';
import ChannelSettings from './components/channel/ChannelSettings';
import Chatbot from './components/chatbot/Chatbot';
import FriendsPage from './components/friends/FriendsPage';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main_page" element={<Mainpage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/personal" element={<PersonalUse />} />
            <Route path="/educational" element={<Educational />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
            <Route path="/channel/:channelId/settings" element={<ChannelSettings />} />
            <Route path="/friends" element={<FriendsPage />} /> {/* Add FriendsPage route */}

            {/*remove the below links later*/}

            <Route path="/profile_card" element={<ProfileCard />} />
            <Route path="/day_card" element={<Daycard />} />

            {/* Footer pages routes */}
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/accessibility" element={<Accessibility />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Chatbot /> {/* Add Chatbot component */}
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;