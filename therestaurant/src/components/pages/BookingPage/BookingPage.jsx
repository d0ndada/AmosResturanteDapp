import React, { useState, useEffect, useContext } from "react";
import AdminView from "./Admin/AdminView";
import BookingForm from "./BookForm/BookForm";

export const BookingPage = () => {
  const [admin, setAdmin] = useState(true);

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
