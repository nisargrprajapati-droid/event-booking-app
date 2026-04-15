import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = ({ selectedSeats, setSelectedSeats }) => {

  const { id } = useParams();

  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    getBookedSeats();
  }, []);

  const getBookedSeats = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/booking/seats/${id}`
      );

      setBookedSeats(res.data.seats);

    } catch (error) {

      console.log(error);

    }

  };

  const seats = [
    "A1","A2","A3","A4","A5",
    "B1","B2","B3","B4","B5",
    "C1","C2","C3","C4","C5",
    "D1","D2","D3","D4","D5"
  ];

  const toggleSeat = (seat) => {

    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter(s => s !== seat)
      );

    } else {

      setSelectedSeats([...selectedSeats, seat]);

    }

  };

  return (

    <div className="seat-wrapper">

      <h3>Select Seats</h3>

      <div className="seat-container">

        {seats.map((seat) => {

          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          return (

            <div
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`seat 
                ${isBooked ? "booked" : ""}
                ${isSelected ? "selected" : ""}
              `}
            >
              {seat}
            </div>

          );

        })}

      </div>

    </div>

  );

};

export default SeatSelection;