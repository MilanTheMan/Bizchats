import React from "react";
import "./style.css";
import chessImg from "../../img/chess.jpg"; 
import freelanceImg from "../../img/workplace.jpg"; 

const Professional = () => {
  // List of businesses with their details
  const businesses = [
    {
      id: 1,
      name: "Chesstopia",
      members: "142 Employees",
      image: chessImg,
    },
    {
      id: 2,
      name: "Freelance Group",
      members: "13 Members",
      image: freelanceImg,
    },
  ];

  return (
    <div className="professional-page">
      {/* Header Section */}
      <header className="professional-header">
        <h1>Welcome to BizChats</h1>
        <p>Your Businesses:</p>
      </header>

      {/* Business List Section */}
      <div className="business-list">
        {businesses.map((business) => (
          <div key={business.id} className="business-card">
            <img
              src={business.image}
              alt={business.name}
              className="business-image"
            />
            <h3>{business.name}</h3>
            <p>{business.members}</p>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="professional-footer">
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

export default Professional;
