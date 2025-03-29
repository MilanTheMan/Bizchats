import React, { use, useState } from "react";
import "./style.css";
import mathImg from "../../img/math.png";
import scienceImg from "../../img/science.png"; 
import designImg from "../../img/design.png";
import {Link} from "react-router-dom";

const Educational = () => {
  // List of classes with their details  
  const classes = [
    {
      id: 1,
      name: "C23 Math Class",
      students: "53 Students",
      image: mathImg,
      link: "../class/c23-math"
    },
    {
      id: 2,
      name: "C24 Science Class",
      students: "33 Students",
      image: scienceImg,
      link: "../class/c24-science"
    },
    {
      id: 3,
      name: "B68 Design Class",
      students: "75 Students",
      image: designImg,
      link: "../class/b68-design"
    },
  ];

  return (
    <div className="educational-page">
      {/* Header Section */}
      <header className="educational-header">
        {/* <h1>Welcome to BizChats</h1> */}
        <p>Your Classes:</p>
      </header>

      {/* Class List Section */}
      <div className="class-list">
        {classes.map((classItem) => (
            <Link to={classItem.link} key={classItem.id}>
              <div key={classItem.id} className="class-card">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="class-image"
                />
                <h3>{classItem.name}</h3>
                <p>{classItem.students}</p>
              </div>
            </Link>
        ))}
      </div>

    </div>
  );
};

export default Educational;
