import React, { useState, useEffect, useContext } from "react";
import BlockchainContext from "../../../BlockchainContext";
import BookingsList from "./BookingList";

export const BookingPage = () => {
  const { loading, restaurantCreated } = useContext(BlockchainContext);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : restaurantCreated ? (
        <div>{<BookingsList />}</div>
      ) : (
        <div>Creating restaurant...</div>
      )}
    </div>
  );
};

export default BookingPage;
