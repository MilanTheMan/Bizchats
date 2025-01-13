import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login_and_signup/Login";
import Signup from './components/login_and_signup/Signup';
import "./components/login_and_signup/style.css";

import Navbar from "./components/navbar/Navbar";
import "./components/navbar/style.css";

import Mainpage from './components/mainpage/Mainpage';
import "./components/mainpage/style.css";



//testing purposes
import Test from "./components/test/Test";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Test/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/main_page" element={<Mainpage/>} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
