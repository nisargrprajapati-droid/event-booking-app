import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";

const UserBookings = () => {

  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/booking");

      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else if (Array.isArray(res.data.bookings)) {
        setBookings(res.data.bookings);
      } else {
        setBookings([]);
      }

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getBookings();
  }, []);

  // DELETE BOOKING
  const deleteBooking = async (id) => {

    if (!window.confirm("Cancel this booking?")) return;

    try {

      await axios.delete(`http://localhost:5000/api/booking/${id}`);

      alert("Booking cancelled");

      getBookings();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="booking-page">

      <h2>🎟 My Bookings</h2>

      <table className="booking-table">

        <thead>

          <tr>
            <th>Image</th>
            <th>Event</th>
            <th>Name</th>
            <th>Tickets</th>
            <th>Total</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {Array.isArray(bookings) && bookings.map((b) => (

            <tr key={b._id}>

              <td>
                <img
                  src={`http://localhost:5000/uploads/${b.eventId?.image}`}
                  alt="event"
                  className="event-img"
                />
              </td>

              <td>{b.eventId?.title}</td>

              <td>{b.name}</td>

              <td>{b.tickets}</td>

              <td>₹{b.totalPrice}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteBooking(b._id)}
                >
                  Cancel
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default UserBookings;