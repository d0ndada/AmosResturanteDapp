import React from "react";
import Login from "../Login/Login";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Admin.css";

const Admin = ({ loggedIn, onLogin, onLogout }) => {
  return (
    <div className="admin-container">
      {!loggedIn ? (
        <Login onLogin={onLogin} />
      ) : (
        <LogoutButton onLogout={onLogout} />
      )}
    </div>
  );
};

export default Admin;
