import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <h1 className="home-text">Amos Kebab</h1>
      <h2 className="fine-dine-text">Fine & Dine</h2>
      <NavLink to="/booking" className="home-button">
        <span className="home-button-text">Book now</span>
      </NavLink>
    </div>
  );
};

export default Home;
