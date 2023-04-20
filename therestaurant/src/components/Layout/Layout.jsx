import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Routes from "../Routes/Routes";
import Admin from "../Admin/Admin";

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername === "Admin" && savedPassword === "Admin") {
      setLoggedIn(true);
      navigate("/Booking");
    }
  }, [navigate]);

  const handleLogin = (username, password) => {
    if (username === "Admin" && password === "Admin") {
      console.log("Logged in successfully!");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setLoggedIn(true);
      navigate("/Booking");
    } else {
      console.log("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <header>
        <h1>Amos fine and dine</h1>
        <Navbar />
        <Admin
          loggedIn={loggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </header>
      <main className="wrapper">
        <Routes />
      </main>
      <footer className="wrapper">
        <p className="footer-text">&copy; 2023 Amo Livs</p>
      </footer>
    </div>
  );
};
