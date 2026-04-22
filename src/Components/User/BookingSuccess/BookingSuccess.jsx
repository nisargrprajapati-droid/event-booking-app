import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccess.css";

const BookingSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h2>⚠ No Ticket Found</h2>
        <button onClick={() => navigate("/")} className="ticket-btn">
          🏠 Go Home
        </button>
      </div>
    );
  }

  const event = booking.eventId || {};

  return (

    <div className="ticket-page">

      <div className="ticket-card">

        <h2 className="success-title">🎉 Booking Confirmed</h2>

        <div className="ticket-body">

          <p><b>Name:</b> {booking.name}</p>
          <p><b>Email:</b> {booking.email}</p>
          <p><b>Phone:</b> {booking.phone}</p>

          <hr />

          <p><b>Event:</b> {event.title || "N/A"}</p>
          <p><b>Location:</b> {event.location || "N/A"}</p>

          <p>
            <b>Date:</b>{" "}
            {event.date
              ? new Date(event.date).toLocaleDateString()
              : "N/A"}
          </p>

          <hr />

          <p><b>Seats:</b> {booking.seats?.join(", ")}</p>
          <p><b>Tickets:</b> {booking.tickets}</p>

          <h3 className="price">
            Total Paid: ₹{booking.totalPrice}
          </h3>

        </div>

        <div className="barcode">
          |||||||||||||||||||||||||||
        </div>

        <div className="ticket-actions">

          <button className="ticket-btn">
            ⬇ Download Ticket
          </button>

          <button
            className="ticket-btn"
            onClick={() => navigate("/my-bookings")}
          >
            📄 My Bookings
          </button>

          <button
            className="ticket-btn"
            onClick={() => navigate("/")}
          >
            🏠 Back Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingSuccess;