import React from "react";
import "./LogoutButton.css";

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
