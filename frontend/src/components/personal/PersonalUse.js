import React from "react";
import "./style.css";
import omegaImg from "../../img/omega.jpg";
import mountainImg from "../../img/mountain.jpg";
import torontoImg from "../../img/toronto.jpg";
import Header from "../header/Header";

const PersonalUse = () => {
  const classes = [
    {
      id: 1,
      name: "Ω Omega",
      members: "250 Members",
      image: omegaImg,
    },
    {
      id: 2,
      name: "The Boys",
      members: "33 Boys",
      image: mountainImg,
    },
    {
      id: 3,
      name: "Torontonians",
      members: "11056 Students",
      image: torontoImg,
    },
  ];

  return (
    <div className="personal-use">
      {/* Header Section */}
      <header className="personal-header">
        <h1>Welcome to BizChats</h1>
        <p>Your Classes:</p>
      </header>

      {/* Class List Section */}
      <div className="class-list">
        {classes.map((classItem) => (
          <div key={classItem.id} className="class-card">
            <img
              src={classItem.image}
              alt={classItem.name}
              className="class-image"
            />
            <h3>{classItem.name}</h3>
            <p>{classItem.members}</p>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="personal-footer">
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Cookies</li>
          <li>Accessibility</li>
        </ul>
      </footer>
    </div>
  );
};

export default PersonalUse;