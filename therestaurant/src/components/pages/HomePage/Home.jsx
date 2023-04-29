import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = ({ onToggleBackground }) => {
  return (
    <div className="Home">
      <h1 className="home-text">Amos Kebab</h1>
      <h2 className="fine-dine-text">Fine & Dine</h2>
      <NavLink to="/booking" className="home-button">
        <button className="home-button-text">Book now</button>
      </NavLink>
    </div>
  );
};

export default Home;
