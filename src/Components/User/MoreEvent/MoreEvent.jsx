import React, { useEffect, useState } from 'react'
import './MoreEvent.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MoreEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='part1'>

      <img
        src="https://t3.ftcdn.net/jpg/10/69/95/96/360_F_1069959675_rSOFTJujzQ1BV4FeZpgSZBOM6MfjDGLY.jpg"
        alt="Banner"
      />

      <div className="event-container">

        {events.map((e) => (
          <div className="event-card" key={e._id}>

            <div className="event-img">
              <img src={e.image} alt={e.title} />
              <span className="event-date">
                {new Date(e.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="event-content">
              <h3>{e.title}</h3>

              <p>
                <strong>Location:</strong> {e.location}
              </p>

              <div className="price-btn">
                <span>₹ {e.price}</span>

                <button onClick={() => navigate(`/ipl/${e._id}`)}>
                  Book Ticket →
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default MoreEvent;