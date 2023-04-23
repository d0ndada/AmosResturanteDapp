import React, { useEffect, useState } from "react";
import useBlockchain from "../../../useContext/useBlockchain";

const AdminView = () => {
  const {
    bookings,
    deleteBooking,
    editBooking,
    selectedDate,
    setSelectedDate,
  } = useBlockchain();
  const [editableBookingId, setEditableBookingId] = useState(null);
  const [editableNumberOfGuest, setEditableNumberOfGuest] = useState("");
  const [editableName, setEditableName] = useState("");
  const [editableDate, setEditableDate] = useState("");
  const [editableTime, setEditableTime] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [sortedBookings, setSortedBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    filterBookingsByDate();
  }, [selectedDate, sortedBookings]);

  useEffect(() => {
    sortBookingsByDate();
  }, [bookings]);

  const filterBookingsByDate = () => {
    if (selectedDate == "") {
    } else {
      const filtered = sortedBookings.filter(
        (booking) => booking.date === selectedDate
      );
      setFilteredBookings(filtered);
    }
  };

  const sortBookingsByDate = () => {
    const sorted = [...bookings].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setSortedBookings(sorted);
  };

  const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const handleEdit = (booking) => {
    setEditableBookingId(booking.id);
    setEditableNumberOfGuest(booking.numberOfGuests);
    setEditableName(booking.name);
    setEditableDate(booking.date);
    setEditableTime(booking.time);
  };
  const handleDelete = async (id) => {
    try {
      setDeleting(id);

      await deleteBooking(id);
    } catch (error) {
      setDeleting(null);
    }
  };
  const handleUpdate = async () => {
    console.log("editableTime:", editableTime);
    const minuteString = minutesToString(editableTime);
    const TimeInMinutes = timeStringToMinutes(minuteString);
    console.log("TimeInMinutes:", TimeInMinutes);
    setTransactionStatus("loading");

    try {
      await editBooking(
        editableBookingId,
        editableNumberOfGuest,
        editableName,
        editableDate,
        TimeInMinutes
      );
      setTransactionStatus("success");
      setEditableBookingId(null);
    } catch (error) {
      console.error(error);
      setTransactionStatus(null);
    }
  };

  const handleCancel = () => {
    setEditableBookingId(null);
    setTransactionStatus(null);
  };

  return (
    <div>
      <label htmlFor="filter-date">Filter by date:</label>
      <input
        type="date"
        id="filter-date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      ></input>
      {filteredBookings.map((booking) => (
        <li key={booking.id}>
          {editableBookingId === booking.id ? (
            <>
              {transactionStatus === "loading" ? (
                <p>Changing the booking...</p>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="Number of guests"
                    value={editableNumberOfGuest}
                    onChange={(e) => setEditableNumberOfGuest(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Date"
                    value={editableDate}
                    onChange={(e) => setEditableDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Time"
                    value={minutesToString(editableTime)}
                    onChange={(e) => setEditableTime(e.target.value)}
                  />

                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={handleCancel}>cancel</button>
                </>
              )}
            </>
          ) : (
            <>
              {deleting === booking.id ? (
                <p>Deleting booking...</p>
              ) : (
                <>
                  <p>Date: {booking.date}</p>
                  <p>Time: {minutesToString(booking.time)}</p>
                  <p>Name: {booking.name}</p>
                  <p>Number of guests: {booking.numberOfGuests}</p>
                  <button onClick={() => handleEdit(booking)}>Edit</button>
                  <button onClick={() => handleDelete(booking.id)}>
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </li>
      ))}
    </div>
  );
};

export default AdminView;
