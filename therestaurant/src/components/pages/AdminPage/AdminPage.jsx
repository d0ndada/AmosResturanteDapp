import React from "react";
import Login from "../../Login/Login";
import "./AdminPage.css";

const AdminPage = ({ onLogin }) => {
  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <div className="admin-content">
          <h2>Admin Login</h2>
          <Login onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
