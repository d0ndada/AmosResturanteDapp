import React, { useState } from "react";
import "./Stage3.css";

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
    <form className="accept-form" onSubmit={handleSubmit}>
      <div className="container">
        <div className="summary">
          <h3 className="summary-text">Summarizing</h3>
        </div>
        <div className="detail">
          <div className="time-title">
            <h5>Date & time</h5>
          </div>
          <div className="time">
            <h3>
              {date} {time}
            </h3>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content-info">
          <h3 className="title">Name</h3>
          <p className="selected-info">{name}</p>
        </div>
        <div className="content-info">
          <h3 className="title">Phone</h3>
          <p className="selected-info">{phone}</p>
        </div>
        <div className="content-info">
          <h3 className="title">email</h3>
          <p className="selected-info">{email}</p>
        </div>
        <div className="content-info">
          <h3 className="title">Persons</h3>
          <p className="selected-info">{numberOfGuests}</p>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="buttons-container">
        <button type="submit">Book</button>
        <button onClick={handleClick}>Go back</button>
      </div>
    </form>
  );
};
