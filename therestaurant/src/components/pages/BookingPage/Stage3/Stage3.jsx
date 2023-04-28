import React, { useState } from "react";

export const Stage3 = ({
  setShowSuccess,
  date,
  time,
  createBooking,
  name,
  phone,
  numberOfGuests,
  email,
  setTransactionStatus,
  setBookingInfo,
  setBooking,
  setPhone,
  setEmail,
  setName,
  setNumberOfGuests,
  setDate,
  setAvailableTimes,
  setTime,
  setCurrentStep,
  setBookingError,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionStatus("loading");

    try {
      const timeInMinutes = timeStringToMinutes(time);
      const receipt = await createBooking(
        numberOfGuests,
        name,
        date,
        timeInMinutes
      );

      if (receipt && receipt.status) {
        setBookingInfo(null);
        setTransactionStatus("success");
        setBooking(true);
        setShowSuccess(true);
        setBookingError(false);

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
      } else {
        setTransactionStatus(null);
        setShowSuccess(false);
        setBookingError(true);
        setTimeout(() => {
          setBookingError(false);
          setCurrentStep(1);
          setName("");
          setEmail("");
          setPhone("");
          setNumberOfGuests("");
          setDate("");
          setAvailableTimes([]);
          setTime("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setTransactionStatus(null);
      setShowSuccess(false);
      setBookingError(true);
      setTimeout(() => {
        setBookingError(false);
        setCurrentStep(1);
        setName("");
        setEmail("");
        setPhone("");
        setNumberOfGuests("");
        setDate("");
        setAvailableTimes([]);
        setTime("");
      }, 3000);
    }
  };

  const handleClick = () => {
    setCurrentStep(2);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>
          {date} {time}
        </h3>
      </div>
      <div>
        <div>
          <h3>Name</h3>
          <p>{name}</p>
        </div>
        <div>
          <h3>Phone</h3>
          <p>{phone}</p>
        </div>
        <div>
          <h3>email</h3>
          <p>{email}</p>
        </div>
        <div>
          <h3>Persons</h3>
          <p>{numberOfGuests}</p>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Book</button>
      <button onClick={handleClick}>Go back</button>
    </form>
  );
};
