import React, { useState } from "react";
import "./Contact.css";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });

    setPopup(true);

    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-content">
          <h2>Kontakta Oss</h2>
          <p>
            Du kan nå oss under restaurangens öppettider eller skicka oss ett e-postmeddelande via formuläret så kontaktar vi dig snarast.
          </p>
          <p>
            Adress: Kungsgatan 1, 111 43 Stockholm
            <br />
            Phone: +46 70 123 45 67
            <br />
            Email: info@restaurang.com
            <br />
            Öppettider: Måndag till Söndag, 11:00 - 22:00
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
      </div>
    </div>
  );
};

export default Contact;
