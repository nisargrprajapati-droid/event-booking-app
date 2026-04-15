import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookingsList() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/api/bookings")
            .then(res => {
                setBookings(res.data)
            })

    }, [])

    return (

        <div>

            <h2>My Bookings</h2>

            {bookings.map(b => (
                <div key={b._id}>

                    <h3>{b.eventId?.title}</h3>

                    <p>Tickets: {b.tickets}</p>

                    <p>Total Price: ₹ {b.totalPrice}</p>

                </div>
            ))}

        </div>

    )

}

export default MyBookingsList;