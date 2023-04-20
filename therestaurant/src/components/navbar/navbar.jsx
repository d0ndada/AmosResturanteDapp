import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink to="/Menu" activeClassName="active-link">
        Menu
      </NavLink>
      <NavLink to="/Booking" activeClassName="active-link">
        Booking
      </NavLink>
      <NavLink to="/Contact" activeClassName="active-link">
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
