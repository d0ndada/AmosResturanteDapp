import { Link } from "react-router-dom";
import React from "react";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Booking">Booking</Link>
        </li>
        <li>
          <Link to="/Contact">Contact us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
