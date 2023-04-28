import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LogoutButton from "../LogoutButton/LogoutButton";

const Navbar = ({ loggedIn, onLogout }) => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-background">
          <div className="navbar-link-container">
            {!loggedIn && (
              <>
                <NavLink className="navbar-link" to="/" end>
                  Hem
                  <div className="navbar-link-underline" />
                </NavLink>
                <NavLink className="navbar-link" to="/menu">
                  Menu
                  <div className="navbar-link-underline" />
                </NavLink>
                <NavLink className="navbar-link" to="/about">
                  Om Oss
                  <div className="navbar-link-underline" />
                </NavLink>
                <NavLink className="navbar-link" to="/contact">
                  Kontakt
                  <div className="navbar-link-underline" />
                </NavLink>

                <NavLink className="navbar-link" to="/admin">
                  Admin
                  <div className="navbar-link-underline" />
                </NavLink>
              </>
            )}
            {loggedIn && <LogoutButton onLogout={onLogout} />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
