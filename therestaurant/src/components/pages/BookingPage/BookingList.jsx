import React, { useEffect } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const BookingsList = () => {
  const { loading, restaurantCreated, getBookings, bookings } = useBlockchain();

  useEffect(() => {
    if (restaurantCreated) {
      getBookings(1);
    }
  }, [restaurantCreated, getBookings]);

  const handleGetBookings = () => {
    getBookings();
  };

  return (
    <div>
      <h2>Bookings</h2>
      <button onClick={handleGetBookings}>Get Bookings</button>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>Name:</strong> {booking.name}
              <br />
              <strong>Number of Guests:</strong> {booking.numberOfGuests}
              <br />
              <strong>Date:</strong> {booking.date}
              <br />
              <strong>Time:</strong> {booking.time}
              <br />
              <strong>Restaurant ID:</strong> {booking.restaurantId}
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsList;
