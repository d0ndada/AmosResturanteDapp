import React, { useState, useEffect, useContext } from "react";
import BlockchainContext from "../../../BlockchainContext";
import AdminView from "./AdminView";
import BookingForm from "./BookForm";

export const BookingPage = () => {
  const [admin, setAdmin] = useState(false);

  return (
    <div>
      {admin ? (
        <BookingForm />
      ) : (
        <ul>
          <AdminView />
        </ul>
      )}
    </div>
  );
};

export default BookingPage;
