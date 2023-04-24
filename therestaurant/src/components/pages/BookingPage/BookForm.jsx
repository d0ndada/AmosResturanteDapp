import { useState, useEffect } from "react";
import useBlockchain from "../../../useContext/useBlockchain";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";

const BookingForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [create, setCreate] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noAvailableTimes, setNoAvailableTimes] = useState(false);

  const { getBookings, createBooking } = useBlockchain();

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

  return (
    <>
      {!showSuccess && (
        <>
          {create ? (
            transactionStatus === "loading" ? (
              <p>Creating the booking...</p>
            ) : (
              <Stage2
                setCreate={setCreate}
                setNumberOfGuests={setNumberOfGuests}
                setDate={setDate}
                setAvailableTimes={setAvailableTimes}
                setTime={setTime}
                createBooking={createBooking}
              />
            )
          ) : (
            <Stage1
              setNumberOfGuests={setNumberOfGuests}
              numberOfGuests={numberOfGuests}
              setDate={setDate}
              setTime={setTime}
              date={date}
              time={time}
              setCreate={setCreate}
              loading={loading}
              availableTimes={availableTimes}
            />
          )}
        </>
      )}
      {showSuccess && <p>Booking succesful!</p>}
    </>
  );
};

export default BookingForm;
