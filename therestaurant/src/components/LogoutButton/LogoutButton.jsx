import React from "react";

import "../navbar/Navbar.css";

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="navbar-link-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
