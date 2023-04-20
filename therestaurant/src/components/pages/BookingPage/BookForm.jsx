import { useState } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const BookingForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { contract, getBookings } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods
        .createBooking(numberOfGuests, name, date, time, 1) // replace 1 with your restaurant id
        .send({ from: contract.defaultAccount });
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
      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;
