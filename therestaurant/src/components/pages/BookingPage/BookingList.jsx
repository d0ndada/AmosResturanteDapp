import React, { useEffect } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const BookingsList = () => {
  const { loading, restaurantCreated, bookings } = useBlockchain();

  //   console.log(contract);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
          <p>Name: {booking.name}</p>
          <p>Number of guests: {booking.numGuests}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
