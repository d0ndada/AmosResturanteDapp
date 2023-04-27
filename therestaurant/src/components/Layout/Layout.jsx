import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import useBlockchain from "../../useContext/useBlockchain";
import BlockchainContext from "../../BlockchainContext";
import RoutesComponent from "../Routes/Routes";
import backgroundImage from "../../Images/mat-turkiskt.jpg";
import bookingPageBackground from "../../Images/booking.jpg";
import adminViewBackground from "../../Images/book.jpg";
import LogoutButton from "../LogoutButton/LogoutButton";

export const Layout = () => {
  const blockchain = useBlockchain();
  const { admin, setAdmin } = blockchain;
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookingClicked, setBookingClicked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername === "Admin" && savedPassword === "Admin") {
      setLoggedIn(true);
      setAdmin(true);

      if (location.pathname !== "/Booking") {
        navigate("/Booking");
      }
    }
  }, [navigate, location]);

  const handleLogin = (username, password) => {
    if (username === "Admin" && password === "Admin") {
      console.log("Logged in successfully!");
      setAdmin(true);
      console.log(admin);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setLoggedIn(true);
      navigate("/Booking");
    } else {
      console.log("Ogiltigt användarnamn eller lösenord!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setLoggedIn(false);
    setAdmin(false);
    navigate("/");
  };

  const getMainBackgroundImage = () => {
    if (location.pathname === "/booking") {
      return blockchain.admin ? adminViewBackground : bookingPageBackground;
    } else {
      return "";
    }
  };
  const layoutStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  const mainStyle = {
    backgroundImage: `url(${getMainBackgroundImage()})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "80vh",
    backgroundPosition: "center",
  };

  return (
    <BlockchainContext.Provider value={blockchain}>
      <div style={layoutStyle}>
        <header>
          <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        </header>
        <main style={mainStyle}>
          <RoutesComponent
            loggedIn={loggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </main>
        {/* <footer>
          <p className="footer-text">&copy; 2023 Amo Livs</p>
        </footer> */}
      </div>
    </BlockchainContext.Provider>
  );
};
