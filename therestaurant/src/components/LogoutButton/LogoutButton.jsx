import React from "react";
// import "./LogoutButton.css";
import "../Navbar/Navbar.css"

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="navbar-link-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
