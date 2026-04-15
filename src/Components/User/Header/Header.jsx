import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== 'undefined') {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="header">

      {/* LOGO */}
      <div className="logo">
        <h3>HARMONI</h3>
        <p>Event Management</p>
      </div>

      {/* MENU */}
      <div className="menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/event">Events</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contactus">Contact</Link></li>
        </ul>
      </div>

      {/* USER SECTION */}
      <div className="user-info">
        {user ? (
          <div className="profile-box" onClick={() => setDropdown(!dropdown)}>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-img"
            />
            <span className="profile-name">
              {user.name}
            </span>

            {dropdown && (
              <div className="dropdown-menu">
                <div onClick={() => { setDropdown(false); navigate("/account"); }}>Account</div>
                <div
                  onClick={() => {
                    setDropdown(false);
                    navigate("/my-bookings");
                  }}
                >
                  My Booking
                </div>    <div onClick={() => { setDropdown(false); handleLogout(); }}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="username"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        )}
      </div>

    </div>
  );
};

export default Header;