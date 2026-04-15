import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // booking data from previous page
  const booking = location.state || {};

  const [method, setMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  // redirect to success page with booking data
  const goToSuccess = () => {
    navigate("/booking-success", { state: { booking } });
  };

  // UPI Payment
  const handleUPIPayment = () => {
    goToSuccess();
  };

  // Card Payment
  const handleCardPayment = () => {

    if (!cardNumber || !name || !expiry || !cvv) {
      setError("Please fill all card details");
      return;
    }

    if (cardNumber.length < 16) {
      setError("Invalid Card Number");
      return;
    }

    if (cvv.length < 3) {
      setError("Invalid CVV");
      return;
    }

    goToSuccess();
  };

  // Net Banking
  const handleNetBanking = () => {
    goToSuccess();
  };

  return (

    <div className="payment-container">

      {/* LEFT SIDE - TICKET DETAILS */}

      <div className="ticket-section">

        <h2>🎟 Ticket Details</h2>

        <div className="ticket-card">

          <h3>{booking.eventTitle}</h3>

          <p>📍 {booking.location}</p>

          <p>📅 {booking.date}</p>

          <p>🎫 Tickets : {booking.tickets}</p>

          <p>💰 Total : ₹ {booking.total}</p>

        </div>

      </div>


      {/* RIGHT SIDE - PAYMENT */}

      <div className="payment-section">

        <h2>💳 Payment Options</h2>

        <div className="payment-tabs">

          <button onClick={() => setMethod("upi")}>UPI</button>
          <button onClick={() => setMethod("card")}>Card</button>
          <button onClick={() => setMethod("netbanking")}>Net Banking</button>

        </div>


        {/* UPI */}

        {method === "upi" && (

          <div className="upi-section">

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
              alt="UPI QR"
              className="upi-qr"
            />

            <div className="upi-apps">

              <button onClick={handleUPIPayment}>PhonePe</button>
              <button onClick={handleUPIPayment}>Google Pay</button>
              <button onClick={handleUPIPayment}>Paytm</button>

            </div>

          </div>

        )}


        {/* CARD */}

        {method === "card" && (

          <div className="card-section">

            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Expiry MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button className="pay-btn" onClick={handleCardPayment}>
              Pay Now
            </button>

          </div>

        )}


        {/* NET BANKING */}

        {method === "netbanking" && (

          <div className="netbanking-section">

            <select>
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>AXIS</option>
            </select>

            <button className="pay-btn" onClick={handleNetBanking}>
              Pay Now
            </button>

          </div>

        )}


        {/* CONFIRM BUTTON */}

        <div className="confirm-payment">

          <button className="confirm-btn" onClick={goToSuccess}>
            Confirm Payment
          </button>

        </div>

      </div>

    </div>

  );
};

export default PaymentPage;