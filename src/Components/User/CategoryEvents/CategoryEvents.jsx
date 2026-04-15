import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryEvents = () => {

  const { category } = useParams();
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:5000/api/events/category/${category}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        setEvents(Array.isArray(data) ? data : []);
      });

  }, [category]);

  return (

    <div className="event-container">

      <h2>{category} Events</h2>

      <div className="event-grid">

        {events.map((event) => (

          <div key={event._id} className="event-card">

            <img src={event.image} alt={event.title} />

            <h3>{event.title}</h3>

            <p>{event.location}</p>

            <p>₹ {event.userPrice}</p>

            {/* 🔥 STATUS */}
            {event.status === "inactive" && (
              <span className="closed-badge">
                Booking Closed
              </span>
            )}

            <button
              disabled={event.status === "inactive"}
              onClick={() => navigate(`/ipl/${event._id}`)}
              style={{
                background:
                  event.status === "inactive" ? "gray" : "#ff4b2b",
                cursor:
                  event.status === "inactive"
                    ? "not-allowed"
                    : "pointer"
              }}
            >
              {event.status === "inactive"
                ? "Event Closed"
                : "Book Ticket"}
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default CategoryEvents;