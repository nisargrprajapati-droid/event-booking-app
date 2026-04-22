
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./IPL.css";

function IPL() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((res) => setEvent(res.data.data || res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="ipl-container">

      <div className="iplimg">
        <img src={event.image} alt={event.title} />
      </div>

      <div className="tkt-container">

        <h1 className="tkt-title">{event.title}</h1>
        <p className="tkt-price">
          ₹ {event.userPrice}
        </p>
        <p className="tkt-subtitle">{event.category}</p>

        {/* 🔥 GO TO BOOKING PAGE */}
        <button
          className="tkt-btn"
          onClick={() => navigate(`/mybooking/${id}`)}
        >
          Book Ticket
        </button>

        <h2 className="tkt-heading">When and Where</h2>

        <div className="tkt-section">

          <div className="tkt-box1">
            <h3>Date and Time</h3>
            <p>{event.date || "TBA"}</p>
            <p>{event.time || "TBA"}</p>
          </div>

          <div className="tkt-box2">
            <h3>Location</h3>
            <p>{event.location}</p>
          </div>

        </div>

        <p>{event.description}</p>

      </div>
    </div>
  );
}

export default IPL;

