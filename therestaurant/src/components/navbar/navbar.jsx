import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-background">
          <div className="navbar-link-container">
            <NavLink className="navbar-link" to="/" end>
              Home
              <div className="navbar-link-underline" />
            </NavLink>
            <NavLink className="navbar-link" to="/about">
              About
              <div className="navbar-link-underline" />
            </NavLink>
            {/* <NavLink className="navbar-link" to="/booking">
              Booking
              <div className="navbar-link-underline" />
            </NavLink> */}
            <NavLink className="navbar-link" to="/contact">
              Contact
              <div className="navbar-link-underline" />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
