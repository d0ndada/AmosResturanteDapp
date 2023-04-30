import React, { useState } from "react";
import Stepper from "../Stepper/Stepper";
import "./tage2.css";

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
      <form className="floating-form" onSubmit={handleSubmit}>
        <div className="floating-label-group">
          <label className="input">
            <input
              className="input__field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.setAttribute("placeholder", "")}
              onBlur={(e) => e.target.setAttribute("placeholder", "Name*")}
              placeholder="Name*"
              required
            />
            <label placeholder="Name*"></label>
          </label>
          <label className="input">
            <input
              className="input__field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => e.target.setAttribute("placeholder", "")}
              onBlur={(e) => e.target.setAttribute("placeholder", "Email*")}
              placeholder="Email*"
              required
            />
            <label placeholder="Email*"></label>
          </label>
          <label className="input">
            <input
              className="input__field"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => e.target.setAttribute("placeholder", "")}
              onBlur={(e) => e.target.setAttribute("placeholder", "Phone*")}
              placeholder="Phone*"
              required
            />
            <label placeholder="Phone*"></label>
          </label>
        </div>
        <div className="Btn-container">
          <button className="continueBtn" type="submit">
            Continue
          </button>
          <button type="button" className="continueBtn" onClick={handleCancel}>
            Cancel booking
          </button>
        </div>
        <label>
          <input
            className="policy"
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
