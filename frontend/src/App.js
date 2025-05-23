import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login_and_signup/Login";
import Signup from './components/login_and_signup/Signup';
import ForgotPassword from "./components/login_and_signup/ForgotPassword";
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

import Info from "./components/info/info";
import "./components/info/style.css"

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
import Index from "./components/index";

import React from 'react';
import { UserProvider } from './context/UserContext';
import ChannelPage from './components/channel/ChannelPage';
import ChannelSettings from './components/channel/ChannelSettings';
import ChannelAnnouncements from './components/channel/ChannelAnnouncements';
import ChannelWork from './components/channel/ChannelWork';
import ChannelMarks from './components/channel/ChannelMarks';
import ChannelMarksAdmin from './components/channel/ChannelMarksAdmin';
import ChannelMessages from './components/channel/ChannelMessages';
import AssignmentDetails from './components/channel/AssignmentDetails';
import Chatbot from './components/chatbot/Chatbot';
import FriendsPage from './components/friends/FriendsPage';
import Friends from './components/friends/Friends';
import PersonalChannel from './components/channel/PersonalChannel';
import ProfessionalPage from './components/channel/ProfessionalPage';
import ChannelSchedule from './components/channel/ChannelSchedule';
import ProfessionalDoccuments from './components/channel/ProfessionalDoccuments';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/main_page/:category" element={<Mainpage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/personal" element={<PersonalUse />} />
            <Route path="/educational" element={<Educational />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/info/:infoId" element={<Info/>} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/channel/:channelId" element={<ChannelPage />}>
              <Route path="announcements" element={<ChannelAnnouncements />} />
              <Route path="assignments" element={<ChannelWork />} />
              <Route path="marks" element={<ChannelMarks />} />
              <Route path="marks-admin" element={<ChannelMarksAdmin />} />
              <Route path="messages" element={<ChannelMessages />} />
              <Route path="schedule" element={<ChannelSchedule />} />
              <Route path="documents" element={<ProfessionalDoccuments />} />
              <Route path="assignments/:assignmentId/details" element={<AssignmentDetails />} />
            </Route>
            <Route path="/personal-channel/:channelId" element={<PersonalChannel />} />
            <Route path="/channel/:channelId/settings" element={<ChannelSettings />} />
            <Route path="/professional/:channelId" element={<ProfessionalPage />}>
              <Route path="messages" element={<ChannelMessages />} />
              <Route path="documents" element={<ProfessionalDoccuments />} />
              <Route path="schedule" element={<ChannelSchedule />} />
              <Route path="settings" element={<ChannelSettings />} />
            </Route>
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends" element={<FriendsPage />} />

            {/*remove the below links later*/}

            <Route path="/profile_card" element={<ProfileCard />} />
            <Route path="/day_card" element={<Daycard />} />

            {/* Footer pages routes */}
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/accessibility" element={<Accessibility />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
          {/* <Chatbot /> */}
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;