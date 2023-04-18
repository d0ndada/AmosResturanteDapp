import React from "react";
import "./Admin.css";

const Admin = () => {
  const handleClick = () => {
    console.log("admin knapp tryckt");
  };
  return (
    <div className="Admin-holder">
      <button onClick={handleClick}>
        <span class="material-symbols-outlined">admin_panel_settings</span>
        admin
      </button>
    </div>
  );
};

export default Admin;
