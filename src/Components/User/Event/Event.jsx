import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Event.css";

const Event = () => {

  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/category")
      .then((res) => {
        const data = res.data?.data || res.data;
        setCategories(Array.isArray(data) ? data : []);
      });
  }, []);

  const handleCategoryClick = (cat) => {

    setSelectedCategory(cat);

    axios.get(`http://localhost:5000/api/events/category/${cat.name}`)
      .then((res) => {
        const data = res.data?.data || res.data?.events || res.data;
        setEvents(Array.isArray(data) ? data : []);
      });

  };

  const handleBack = () => {
    setSelectedCategory(null);
    setEvents([]);
  };

  const handleBookTicket = (eventId) => {
    const user = localStorage.getItem("user");

    if (!user) {
      localStorage.setItem("redirectEvent", eventId);
      navigate("/login");
    } else {
      navigate(`/ipl/${eventId}`);
    }
  };

  // ✅ NEW: USER PRICE UPDATE FUNCTION
  const handleUserPriceChange = async (id, price) => {
    try {
      await axios.put(`http://localhost:5000/api/events/user-price/${id}`, {
        price
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= CATEGORY EVENTS ================= */

  if (selectedCategory) {
    return (
      <div className="event-page">

        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <h2>{selectedCategory.name} Events</h2>

        <div className="event-grid">

          {events.length > 0 ? (

            events.map((item) => (

              <div className="event-card" key={item._id}>

                {item.image && (
                  <img src={item.image} alt={item.title} />
                )}

                <div className="event-card-body">

                  <h3>{item.title}</h3>
                  <p>📍 {item.location}</p>

                  {/* ✅ ADMIN PRICE (REFERENCE ONLY) */}
                  <p style={{ fontSize: "13px", color: "gray" }}>
                    Admin Price: ₹{item.adminPrice}
                  </p>

                  {/* ✅ USER PRICE EDIT (NEW FEATURE) */}
                  <input
                    type="number"
                    defaultValue={item.userPrice}
                    onBlur={(e) =>
                      handleUserPriceChange(item._id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "6px",
                      margin: "8px 0",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
                  />

                  {/* 🔥 STATUS BADGE */}
                  {item.status === "inactive" && (
                    <span className="closed-badge">
                      Booking Closed
                    </span>
                  )}

                  {/* 🔥 BUTTON */}
                  <button
                    className="book-btn"
                    disabled={item.status === "inactive"}
                    onClick={() => handleBookTicket(item._id)}
                    style={{
                      background:
                        item.status === "inactive" ? "gray" : "#ff4b2b",
                      cursor:
                        item.status === "inactive"
                          ? "not-allowed"
                          : "pointer"
                    }}
                  >
                    {item.status === "inactive"
                      ? "Event Closed"
                      : "Book Ticket →"}
                  </button>

                </div>

              </div>

            ))

          ) : (
            <p>No events found</p>
          )}

        </div>

      </div>
    );
  }

  /* ================= CATEGORY LIST ================= */

  return (

    <div className="event-page">

      <h2>Event Categories</h2>

      <div className="event-grid">

        {categories.map((cat) => (

          <div
            className="event-card"
            key={cat._id}
            onClick={() => handleCategoryClick(cat)}
          >

            {cat.image && (
              <img src={cat.image} alt={cat.name} />
            )}

            <div className="category-card-body">
              <h3>{cat.name}</h3>
            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Event;