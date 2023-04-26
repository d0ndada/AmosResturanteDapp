import React from "react";
import "./Stage1.css";

const Stage1 = ({
  setNumberOfGuests,
  numberOfGuests,
  setDate,
  setTime,
  date,
  time,
  setCreate,
  checkAvailabilty,
  setAvailableTimes,
  loading,
  availableTimes,
}) => {
  const handleClick = async (e) => {
    if (numberOfGuests && date && time) {
      const isAvailable = await checkAvailabilty(date, time, numberOfGuests);
      if (isAvailable) {
        setCreate(true);
      } else {
        console.error("");
      }
    }
  };
  const handleClear = () => {
    setNumberOfGuests("");
    setDate("");
    setAvailableTimes([]);
    setTime("");
  };
  const today = new Date().toISOString().slice(0, 10);
  return (
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
          min={today}
          required
        />
      </label>
      {loading ? (
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
  );
};

export default Stage1;
