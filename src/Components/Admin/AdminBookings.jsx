import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookings.css";

const AdminBookings = () => {

  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/booking");

      // FIX: backend sends { success:true, bookings:[] }
      setBookings(res.data.bookings);

    } catch (err) {

      console.log(err);

    }

  };

  const deleteBooking = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/api/booking/${id}`);

      getBookings();

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    getBookings();
  }, []);

  return (

    <div className="admin-booking">

      <h2>All Bookings</h2>

      <table>

        <thead>

          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Event</th>
            <th>Tickets</th>
            <th>Total</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {Array.isArray(bookings) && bookings.length > 0 ? (

            bookings.map((b) => (

              <tr key={b._id}>

                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.eventId?.title}</td>
                <td>{b.tickets}</td>
                <td>₹{b.totalPrice}</td>

                <td>
                  <button onClick={() => deleteBooking(b._id)}>
                    Delete
                  </button>
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default AdminBookings;