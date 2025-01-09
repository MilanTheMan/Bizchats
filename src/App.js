import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import bizchats_logo from './img/bizchats_logo.png';

import Login from "./components/login/Login";
import "./components/login/style.css";

import Navbar from "./components/navbar/Navbar";
import "./components/navbar/style.css"


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
