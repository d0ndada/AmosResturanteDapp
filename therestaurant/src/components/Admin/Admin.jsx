import React, { useState } from "react";
import Login from "../Login/Login";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Admin.css";

const Admin = ({ loggedIn, onLogin, onLogout }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="admin-container">
      <button
        className="navbar-link-btn"
        onClick={handleClick}
      >
        Admin
      </button>
      {showLoginForm && !loggedIn && <Login onLogin={onLogin} />}
      {loggedIn && <LogoutButton onLogout={onLogout} />}
    </div>
  );
};

export default Admin;
