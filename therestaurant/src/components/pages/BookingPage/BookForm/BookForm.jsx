import { useState, useEffect } from "react";
import useBlockchain from "../../../../useContext/useBlockchain";
import Stage1 from "../Stage1/Stage1";
import Stage2 from "../Stage2/Stage2";
import { Stage3 } from "../Stage3/Stage3";
import useLocalStorage from "../../../../Hooks/useLocalStorage";

import "./BookForm.css";
import Stepper from "../Stepper/Stepper";

const BookingForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useLocalStorage("guests", "");
  const [date, setDate] = useLocalStorage("date", "");
  const [time, setTime] = useLocalStorage("time", "");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentStep, setCurrentStep] = useLocalStorage("currentStep", 1);
  const [create, setCreate] = useLocalStorage("create", false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useLocalStorage("showSuccess", false);
  const [noAvailableTimes, setNoAvailableTimes] = useState(false);
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [phone, setPhone] = useLocalStorage("phone", "");
  const [bookingInfo, setBookingInfo] = useState(null);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  const [transactionStatus, setTransactionStatus] = useLocalStorage(
    "transactionStatus",
    null
  );

  const { getBookings, createBooking, selectedDate } = useBlockchain();

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
    const availableTables = 15 * 6;

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

  return (
    <div className="Booking">
      <Stepper currentStep={currentStep} />
      {!showSuccess && (
        <>
          {currentStep === 1 && (
            <Stage1
              setNumberOfGuests={setNumberOfGuests}
              numberOfGuests={numberOfGuests}
              setDate={setDate}
              setTime={setTime}
              date={date}
              time={time}
              setCreate={setCurrentStep}
              loading={loading}
              availableTimes={availableTimes}
              checkAvailabilty={checkAvailabilty}
              setAvailableTimes={setAvailableTimes}
              selectedDate={selectedDate}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 2 && (
            <Stage2
              setCurrentStep={setCurrentStep}
              setCreate={setCreate}
              setNumberOfGuests={setNumberOfGuests}
              setDate={setDate}
              setAvailableTimes={setAvailableTimes}
              setTime={setTime}
              setTransactionStatus={setTransactionStatus}
              date={date}
              time={time}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              setBookingInfo={setBookingInfo}
              setBooking={setBooking}
            />
          )}

          {currentStep === 3 &&
            !bookingError &&
            (transactionStatus === "loading" ? (
              <span class="loader-create"></span>
            ) : (
              <Stage3
                setShowSuccess={setShowSuccess}
                date={date}
                time={time}
                createBooking={createBooking}
                numberOfGuests={numberOfGuests}
                setCurrentStep={setCurrentStep}
                name={name}
                phone={phone}
                email={email}
                setTransactionStatus={setTransactionStatus}
                setBookingInfo={setBookingInfo}
                setBooking={setBooking}
                setPhone={setPhone}
                setEmail={setEmail}
                setName={setName}
                setNumberOfGuests={setNumberOfGuests}
                setDate={setDate}
                setAvailableTimes={setAvailableTimes}
                setTime={setTime}
                setBookingError={setBookingError}
              />
            ))}
        </>
      )}
      {showSuccess && <p>Booking successful!</p>}
      {bookingError && <p>Booking error. Please try again.</p>}
    </div>
  );
};

export default BookingForm;
