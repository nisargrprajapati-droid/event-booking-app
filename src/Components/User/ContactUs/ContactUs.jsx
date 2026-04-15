import './ContactUs.css';
import React, { useState } from 'react';
import axios from "axios";

function ContactUs() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {

    e.preventDefault();

    try {

        await axios.post("http://localhost:5000/api/contact/add", {
      name,
      email,
      phone,
      message
    });

      alert("Message sent successfully");

    } catch (error) {

      console.log(error);
      alert("Error sending message");

    }

  };

  return (
    <div>

      {/* IMAGE SECTION (UNCHANGED) */}
      <div className='img'>
        <h2>Contact Us Now <br /></h2>
        <h1 className='h'>KEEP IN TOUCH</h1>
        <a className='home'>Home</a> | <a href="#" className='about'>Contact Us</a>
      </div>

      <div className="contact-container">

        {/* CONTACT FORM */}
        <div className="contact-card">

          <div className="icon-box">
            <span>🔒</span>
          </div>

          <h3>Contact Us</h3>

          <form className="contact-form" onSubmit={sendMessage}>

            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <textarea
              placeholder="Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button type="submit">SEND</button>

          </form>

        </div>

        {/* GOOGLE MAP (UNCHANGED) */}
        <div className="map-box">
          <iframe
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            loading="lazy"
            title="Ahmedabad Map">
          </iframe>
        </div>

      </div>

    </div>
  )
}

export default ContactUs;