import React, { useState } from "react";
import "./Contact.css";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g. send data to a server
    console.log({ name, email, message });

    // Show the popup
    setPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <div className="Contact">
      <h2>Contact Us</h2>
      <p>
        You can reach us at our restaurant during our working hours or send us
        an email using the form below. We'll get back to you as soon as
        possible.
      </p>
      <p>
        Address: IPSUM  Street, 12345, Lorem Ipsum
        <br />
        Phone: +46 70 123 45 67
        <br />
        Email: info@restaurant.com
        <br />
        Working Hours: Monday to Sunday, 11:00 AM - 10:00 PM
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      {popup && <div className="popup">Your email has been sent!</div>}
    </div>
  );
};

export default Contact;
