import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login_and_signup/Login";
import Signup from './components/login_and_signup/Signup';
import "./components/login_and_signup/style.css";

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


//testing purposes
import Test from "./components/test/Test";


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
                <Route path="/settings" element={<Settings/>} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/*" element={<NotFound/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>

    </div>
  );
}

export default App;
