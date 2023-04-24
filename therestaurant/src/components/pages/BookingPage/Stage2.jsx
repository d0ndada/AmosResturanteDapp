import React, { useState } from "react";

const Stage2 = ({
  numberOfGuests,
  setCreate,
  setNumberOfGuests,
  setDate,
  setAvailableTimes,
  setTime,
  timeStringToMinutes,
  setTransactionStatus,
  setShowSuccess,

  date,
  time,
  createBooking,
}) => {
  const [gdprConsent, setGdpConsent] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [booking, setBooking] = useState(false);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionStatus("loading");

    try {
      const timeInMinutes = timeStringToMinutes(time);
      await createBooking(numberOfGuests, name, date, timeInMinutes);

      setBookingInfo(null);
      setCreate(false);
      setTransactionStatus("success");
      setBooking(true);
      setShowSuccess(true);

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
  return (
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
  );
};

export default Stage2;
