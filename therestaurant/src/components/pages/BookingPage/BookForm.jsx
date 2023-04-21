import { useState, useEffect } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const BookingForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { contract, getBookings, account } = useBlockchain();

  useEffect(() => {
    const updateAvailableTimes = async () => {
      if (date) {
        const newAvailableTimes = [];
        const timeSlots = ["18:00", "21:00"];
        for (const timeSlot of timeSlots) {
          const availableSeats = await checkAvailabilty(date, timeSlot);
          if (availableSeats > 0) {
            newAvailableTimes.push(timeSlot);
          }
        }
        setAvailableTimes(newAvailableTimes);
      }
    };
    updateAvailableTimes();
  }, [date]);

  const checkAvailabilty = async (date, time) => {
    const bookings = await getBookings(1);
    const availableSeats = 15 * 6;
    const reservedSeatsAtTime = bookings
      .filter((booking) => booking.date === date && booking.time === time)
      .reduce((sum, booking) => sum + parseInt(booking.numberOfGuests), 0);
    return availableSeats - reservedSeatsAtTime;
  };
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeInMinutes = timeStringToMinutes(time);
      await contract.methods
        .createBooking(numberOfGuests, name, date, timeInMinutes, 1) // replace 1 with your restaurant id
        .send({ from: account });
      console.log("Booking created successfully!");
      getBookings(1); // replace 1 with your restaurant id
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of guests:
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <fieldset>
        <legend>Available times:</legend>
        {availableTimes.map((timeSlot, index) => (
          <label key={index}>
            <input
              type="radio"
              name="time"
              value={timeSlot}
              checked={timeSlot === time}
              onChange={(e) => setTime(e.target.value)}
            />
            {timeSlot}
          </label>
        ))}
      </fieldset>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;
