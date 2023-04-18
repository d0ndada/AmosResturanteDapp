import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/Home";
import BookingPage from "../pages/BookingPage/BookingPage";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Booking" element={<BookingPage />} />
    </Routes>
  );
};

export default RoutesComponent;
