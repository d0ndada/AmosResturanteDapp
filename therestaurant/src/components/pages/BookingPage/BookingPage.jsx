import React, { useState, useEffect, useContext } from "react";
import BlockchainContext from "../../../BlockchainContext";
import BookingsList from "./BookingList";
import BookingForm from "./BookForm";

export const BookingPage = () => {
  const { loading, restaurantCreated } = useContext(BlockchainContext);

  return (
    <div>
      <BookingForm />
      <BookingsList />
    </div>
  );
};

export default BookingPage;
