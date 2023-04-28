import React, { useState, useEffect, useContext } from "react";
import AdminView from "./Admin/AdminView";
import BookingForm from "./BookForm/BookForm";
import BlockchainContext from "../../../BlockchainContext";
import "./BookingPage.css";

export const BookingPage = () => {
  const { admin, setAdmin } = useContext(BlockchainContext);
  return (
    <div className="Holder">
      {admin ? (
        <ul>
          <AdminView />
        </ul>
      ) : (
        <BookingForm />
      )}
    </div>
  );
};

export default BookingPage;
