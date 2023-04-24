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
  const [create, setCreate] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noAvailableTimes, setNoAvailableTimes] = useState(false);
  const [gdprConsent, setGdpConsent] = useState(false);

  const { contract, getBookings, account } = useBlockchain();

  useEffect(() => {
    const updateAvailableTimes = async () => {
      if (date && numberOfGuests) {
        setLoading(true);
        const newAvailableTimes = [];
        const timeSlots = ["18:00", "21:00"];
        let noAvailableTimeSlots = true;
        for (const timeSlot of timeSlots) {
          const availableSeats = await checkAvailabilty(
            date,
            timeSlot,
            numberOfGuests
          );
          if (availableSeats > 0) {
            newAvailableTimes.push(timeSlot);
            noAvailableTimeSlots = false;
          }
        }
        setAvailableTimes(noAvailableTimeSlots);
        setAvailableTimes(newAvailableTimes);
        setLoading(false);
      } else {
        setAvailableTimes([]);
        setNoAvailableTimes(false);
      }
    };
    updateAvailableTimes();
  }, [date, numberOfGuests]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };
  const checkAvailabilty = async (date, time, numberOfGuests) => {
    const bookings = await getBookings(1);
    const availableTables = 2;
    const reservedTablesAtTime = bookings
      .filter(
        (booking) =>
          booking.date === date && minutesToString(booking.time) === time
      )
      .reduce((sum, booking) => {
        const tablesNeeded = Math.ceil(parseInt(booking.numberOfGuests) / 6);
        return sum + tablesNeeded;
      }, 0);
    const freeTable = availableTables - reservedTablesAtTime;
    const tablesNeededForCurrentBooking = Math.ceil(numberOfGuests / 6);
    return freeTable >= tablesNeededForCurrentBooking;
  };
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const handleClick = async (e) => {
    if (numberOfGuests && date && time) {
      const isAvailable = await checkAvailabilty(date, time, numberOfGuests);
      if (isAvailable) {
        setCreate(true);
      } else {
        console.log("no");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionStatus("loading");

    try {
      const timeInMinutes = timeStringToMinutes(time);
      await contract.methods
        .createBooking(numberOfGuests, name, date, timeInMinutes, 1)
        .send({ from: account });
      console.log("Booking created successfully!");
      setBookingInfo(null);
      setCreate(false);
      setTransactionStatus("success");
      setBooking(true);
      setShowSuccess(true);

      getBookings(1);
      setName("");
      setEmail("");
      setPhone("");
      setTimeout(() => {
        setBooking(false);
        setNumberOfGuests("");
        setDate("");
        setAvailableTimes([]);
        setTime("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setTransactionStatus(null);
    }
  };

  const handleCancel = () => {
    setBookingInfo(null);
    setCreate(false);
    setEmail("");
    setPhone(null);
    setName("");

    setNumberOfGuests("");
    setDate("");
    setAvailableTimes([]);
    setTime("");
  };

  const handleClear = () => {
    setNumberOfGuests("");
    setDate("");
    setAvailableTimes([]);
    setTime("");
  };
  return (
    <>
      {!showSuccess && (
        <>
          {create ? (
            transactionStatus === "loading" ? (
              <p>Creating the booking...</p>
            ) : (
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
                <label>
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdpConsent(e.target.checked)}
                    required
                  ></input>
                  i agree to the Privacy Policy
                </label>
              </form>
            )
          ) : (
            <form>
              <label>
                Number of guests:
                <input
                  type="number"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  min="1"
                  // max="40"
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
              {loading ? (
                <p>Loading...</p>
              ) : (
                <fieldset>
                  <legend>Available times:</legend>
                  {numberOfGuests ? (
                    availableTimes.length > 0 ? (
                      availableTimes.map((timeSlot, index) => (
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
                      ))
                    ) : date ? (
                      <p>We are fully booked today</p>
                    ) : (
                      <p>Please select a date</p>
                    )
                  ) : (
                    <p>Please enter the number of guests</p>
                  )}
                </fieldset>
              )}
              <button type="button" onClick={handleClick}>
                Continue
              </button>
              <button type="button" onClick={handleClear}>
                Clear
              </button>
            </form>
          )}
        </>
      )}
      {showSuccess && <p>Booking succesful!</p>}
    </>
  );
};

export default BookingForm;
