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
  const [confirm, setConfirm] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
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

  const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };
  const checkAvailabilty = async (date, time) => {
    const bookings = await getBookings(1);
    const availableSeats = 15 * 6;
    const reservedSeatsAtTime = bookings
      .filter(
        (booking) =>
          booking.date === date && minutesToString(booking.time) === time
      )
      .reduce((sum, booking) => sum + parseInt(booking.numberOfGuests), 0);
    return availableSeats - reservedSeatsAtTime;
  };
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const handleClick = (e) => {
    if (numberOfGuests && date && time) {
      setConfirm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeInMinutes = timeStringToMinutes(time);
      await contract.methods
        .createBooking(numberOfGuests, name, date, timeInMinutes, 1)
        .send({ from: account });
      console.log("Booking created successfully!");
      setBookingInfo(null);
      setConfirm(false);
      // Display booking info (e.g., in a list) along with email and phone
      // ...
      getBookings(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setBookingInfo(null);
    setConfirm(false);
  };

  return (
    <>
      {confirm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create Booking</button>
          <button type="button" onClick={handleCancel}>
            Cancel booking
          </button>
        </form>
      ) : (
        <form>
          <label>
            Number of guests:
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
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
                  required
                />
                {timeSlot}
              </label>
            ))}
          </fieldset>
          <button type="button" onClick={handleClick}>
            Continue
          </button>
        </form>
      )}
    </>
  );
};

export default BookingForm;
