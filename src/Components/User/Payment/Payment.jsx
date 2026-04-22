import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIXED
  const booking = location.state?.booking || {};

  const [method, setMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const goToSuccess = () => {
    navigate("/booking-success", { state: { booking } });
  };

  const handleUPIPayment = () => goToSuccess();

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

  const handleNetBanking = () => goToSuccess();

  return (

    <div className="payment-container">

      <div className="ticket-section">

        <h2>🎟 Ticket Details</h2>

        <div className="ticket-card">

          <h3>{booking.eventTitle || "N/A"}</h3>

          <p>📍 {booking.location || "N/A"}</p>

          <p>
            📅 {booking.date
              ? new Date(booking.date).toLocaleDateString()
              : "N/A"}
          </p>

          <p>🎫 Tickets : {booking.tickets || 0}</p>

          <p>💰 Total : ₹ {booking.totalPrice || 0}</p>

        </div>

      </div>

      <div className="payment-section">

        <h2>💳 Payment Options</h2>

        <div className="payment-tabs">
          <button onClick={() => setMethod("upi")}>UPI</button>
          <button onClick={() => setMethod("card")}>Card</button>
          <button onClick={() => setMethod("netbanking")}>Net Banking</button>
        </div>

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