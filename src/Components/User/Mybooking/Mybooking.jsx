import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Mybooking.css";
import SeatSelection from "../SeatSelection/SeatSelection";

const Mybooking = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [price, setPrice] = useState(0);
  const [customPrice, setCustomPrice] = useState(0);

  const [eventData, setEventData] = useState({}); // ✅ NEW

  /* ================= GET EVENT ================= */

  useEffect(() => {

    const getEvent = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`
        );

        const event = res.data?.data;

        if (event?.status === "inactive") {
          alert("❌ Booking is closed for this event");
          navigate("/");
          return;
        }

        if (event) {
          setPrice(event.userPrice);
          setCustomPrice(event.userPrice);
          setEventData(event); // ✅ SAVE FULL EVENT
        }

      } catch (error) {
        console.log(error);
      }
    };

    getEvent();

  }, [id]);

  /* ================= CALCULATIONS ================= */

  const tickets = selectedSeats.length;
  const total = tickets * customPrice;

  /* ================= BOOKING ================= */

  const handleBooking = async () => {

    try {

      if (!name || !email || !phone || selectedSeats.length === 0) {
        alert("Please fill all fields and select seats");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking`,
        {
          name,
          email,
          phone,
          eventId: id,
          seats: selectedSeats,
          tickets,
          totalPrice: total
        }
      );

      if (res.data.success) {

        alert("🎉 Booking Successful");

        // ✅ FIXED KEY
        const bookingData = res.data.data;

        navigate("/payment", {
          state: {
            booking: {
              name,
              email,
              phone,
              seats: selectedSeats,
              tickets,
              totalPrice: total,
              eventId: bookingData?.eventId || eventData, // ✅ SAFE
              eventTitle: bookingData?.eventId?.title || eventData?.title,
              location: bookingData?.eventId?.location || eventData?.location,
              date: bookingData?.eventId?.date || eventData?.date
            }
          }
        });

      }

    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }

  };

  return (

    <div className="booking-container">

      <h2 className="booking-title">🎟 Book Your Ticket</h2>

      <SeatSelection
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <div className="booking-form">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="price-box">
          🎫 Tickets Selected: <b>{tickets}</b>
        </div>

        <div className="price-box">
          💰 Price Per Ticket: <b>₹{customPrice}</b>
        </div>

        <div className="price-box">
          💰 Total Price: <b>₹{total}</b>
        </div>

        <button className="book-btn" onClick={handleBooking}>
          Confirm Booking
        </button>

      </div>

    </div>
  );
};

export default Mybooking;