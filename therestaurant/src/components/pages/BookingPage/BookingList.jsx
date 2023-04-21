import React, { useEffect } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const BookingsList = () => {
  const { bookings } = useBlockchain();

  const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Date: {booking.date}</p>
          <p>Time: {minutesToString(booking.time)}</p>
          <p>Name: {booking.name}</p>
          <p>Number of guests: {booking.numberOfGuests}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
