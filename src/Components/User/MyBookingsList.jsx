import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const fetchBookings = async () => {
            try {

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/booking`
                );

                console.log("BOOKINGS RESPONSE:", res.data);

                const data = res.data?.data || res.data;

                setBookings(Array.isArray(data) ? data : []);

            } catch (error) {
                console.log("BOOKINGS ERROR:", error);
                setBookings([]);
            }
        };

        fetchBookings();

    }, []);

    return (

        <div className="mybookings-container">

            <h2>My Bookings</h2>

            <div className="booking-grid">

                {Array.isArray(bookings) && bookings.length > 0 ? (

                    bookings.map((item) => (

                        <div className="booking-card" key={item._id}>

                            {/* ✅ FIXED IMAGE */}
                            {item.eventId?.image && (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${item.eventId.image}`}
                                    alt={item.eventId?.title}
                                    className="booking-img"
                                />
                            )}

                            <div className="booking-details">

                                {/* ✅ FIXED DATA ACCESS */}
                                <h3>{item.eventId?.title || "No Title"}</h3>

                                <p>📍 {item.eventId?.location || "No Location"}</p>

                                <p>🎟 Tickets: {item.tickets}</p>

                                <p>👤 Name: {item.name}</p>

                                <p>📧 Email: {item.email}</p>

                                <p>📞 Phone: {item.phone}</p>

                                <p>
                                    📅 {item.eventId?.date} | ⏰ {item.eventId?.time}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                        No bookings found
                    </p>

                )}

            </div>

        </div>

    );
};

export default MyBookings;