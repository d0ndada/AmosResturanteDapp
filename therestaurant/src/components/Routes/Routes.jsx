import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/Home";
import BookingPage from "../pages/BookingPage/BookingPage";
import Contact from "../pages/Contact/Contact";
import AdminPage from "../pages/AdminPage/AdminPage";
import About from "../pages/About/About";
import Menu from "../pages/Menu/Menu";

const RoutesComponent = ({ loggedIn, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Booking" element={<BookingPage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/About" element={<About />} />
      <Route
        path="/Admin"
        element={
          <AdminPage
            loggedIn={loggedIn}
            onLogin={onLogin}
            onLogout={onLogout}
          />
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
