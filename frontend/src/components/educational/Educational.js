import React from "react";
import "./style.css";
import mathImg from "../../img/math.png";
import scienceImg from "../../img/science.png"; 
import designImg from "../../img/design.png"; 

const Educational = () => {
  // List of classes with their details
  const classes = [
    {
      id: 1,
      name: "C23 Math Class",
      students: "53 Students",
      image: mathImg,
    },
    {
      id: 2,
      name: "C24 Science Class",
      students: "33 Students",
      image: scienceImg,
    },
    {
      id: 3,
      name: "B68 Design Class",
      students: "75 Students",
      image: designImg,
    },
  ];

  return (
    <div className="educational-page">
      {/* Header Section */}
      <header className="educational-header">
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
            <p>{classItem.students}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Educational;
