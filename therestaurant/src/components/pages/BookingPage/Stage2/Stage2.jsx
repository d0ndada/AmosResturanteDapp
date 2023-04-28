import React, { useState } from "react";
import Stepper from "../Stepper/Stepper";

const Stage2 = ({
  setCreate,
  setNumberOfGuests,
  setDate,
  setAvailableTimes,
  setTime,
  setTransactionStatus,

  setCurrentStep,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  setBookingInfo,
  setBooking,
}) => {
  const [gdprConsent, setGdpConsent] = useState(false);

  const handleCancel = () => {
    setCurrentStep(1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };
  return (
    <>
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
        <button type="submit">Continue</button>
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
    </>
  );
};

export default Stage2;
