import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";

import {
  FaUsers,
  FaCalendarAlt,
  FaTicketAlt,
  FaEnvelope
} from "react-icons/fa";

const Dashboard = () => {

  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    bookings: 0,
    contacts: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [monthly, setMonthly] = useState({});

  useEffect(() => {
    fetchStats();
    fetchAnalytics();
    fetchRecentBookings();
  }, []);

  /* ================= FETCH ================= */

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/dashboard");
    setStats(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/analytics");
    setMonthly(res.data.monthly);
  };

  const fetchRecentBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/recent-bookings");
    setRecentBookings(res.data);
  };

  /* ================= DATA ================= */

  const platformData = {
    labels: ["Users", "Events", "Bookings", "Contacts"],
    datasets: [
      {
        label: "Platform Data",
        data: [
          stats.users,
          stats.events,
          stats.bookings,
          stats.contacts
        ],
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#f6c23e",
          "#e74a3b"
        ]
      }
    ]
  };

  const monthlyData = {
    labels: Object.keys(monthly || {}),
    datasets: [
      {
        label: "Monthly Bookings",
        data: Object.values(monthly || {}),
        borderColor: "#4e73df",
        backgroundColor: "rgba(78,115,223,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const doughnutData = {
    labels: ["Users", "Events", "Bookings", "Contacts"],
    datasets: [
      {
        data: [
          stats.users,
          stats.events,
          stats.bookings,
          stats.contacts
        ],
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#f6c23e",
          "#e74a3b"
        ]
      }
    ]
  };

  /* ================= UI ================= */

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">📊 Admin Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div className="cards">

        <div className="card users">
          <FaUsers className="card-icon"/>
          <div>
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>

        <div className="card events">
          <FaCalendarAlt className="card-icon"/>
          <div>
            <h3>Total Events</h3>
            <p>{stats.events}</p>
          </div>
        </div>

        <div className="card bookings">
          <FaTicketAlt className="card-icon"/>
          <div>
            <h3>Total Bookings</h3>
            <p>{stats.bookings}</p>
          </div>
        </div>

        <div className="card contacts">
          <FaEnvelope className="card-icon"/>
          <div>
            <h3>Contact Messages</h3>
            <p>{stats.contacts}</p>
          </div>
        </div>

      </div>

      {/* ================= CHART GRID ================= */}
      <div className="chart-grid">

        <div className="chart-card">
          <h2>Platform Overview</h2>
          <Bar data={platformData} />
        </div>

        <div className="chart-card">
          <h2>Monthly Growth</h2>
          <Line data={monthlyData} />
        </div>

        <div className="chart-card small">
          <h2>Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>

      </div>

      {/* ================= RECENT BOOKINGS ================= */}
      <div className="recent-table">

        <h2>Recent Bookings</h2>

        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Event</th>
              <th>Tickets</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {recentBookings.map((b) => (

              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.eventId?.title}</td>
                <td>{b.tickets}</td>
                <td>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default Dashboard;