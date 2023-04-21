import React, { useState, useEffect, useContext } from "react";
import BlockchainContext from "../../../BlockchainContext";
import BookingsList from "./BookingList";
import BookingForm from "./BookForm";

export const BookingPage = () => {
  const { loading, restaurantCreated } = useContext(BlockchainContext);
  const [admin, setAdmin] = useState(false);

  return <div>{admin ? <BookingForm /> : <BookingsList />}</div>;
};

export default BookingPage;
