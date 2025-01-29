import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login_and_signup/Login";
import Signup from './components/login_and_signup/Signup';
import HomePage from './components/home/HomePage';
import PersonalUse from "./components/personal/PersonalUse";
import Educational from "./components/educational/Educational";
import Professional from "./components/professional/Professional";
import ClassPage from "./components/class/ClassPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Mainpage from './components/mainpage/Mainpage';
import Settings from "./components/settings/Settings";
import Schedule from './components/schedule/Schedule';
import NotFound from './components/notfound/notfound';

import ProfileCard from "./components/profile_card/ProfileCard";
import Daycard from './components/schedule/popup/Daycard';
import Test from "./components/test/Test";

// Footer pages
import TermsConditions from "./components/footer/TermsConditions";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import Cookies from "./components/footer/Cookies";
import Accessibility from "./components/footer/Accessibility";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Test/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/main_page" element={<Mainpage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/personal" element={<PersonalUse />} />
                <Route path="/educational" element={<Educational />} />
                <Route path="/professional" element={<Professional />} />
                <Route path="/class/:classId" element={<ClassPage />} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/profile_card" element={<ProfileCard/>} />
                <Route path="/day_card" element={<Daycard/>} />
                
                {/* Footer pages routes */}
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/accessibility" element={<Accessibility />} />

                <Route path="/*" element={<NotFound/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
