import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaPen
} from "react-icons/fa";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    phone: ""
  });

  // ✅ Load logged-in user from localStorage
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <div className="account-page">
      <div className="account-card">

        <div className="account-header">
          🔥 Account Details
        </div>

        <div className="account-nav">
          <div
            className="nav-left"
            onClick={() => navigate("/")}
          >
            <FaHome /> HOME
          </div>

          <div className="nav-right">
            <span onClick={() => navigate("/changepw")}>
              CHANGE PASSWORD
            </span>
          </div>
        </div>

        <div className="profile-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
          />
        </div>

        <div className="details-section">
          <h3 className="details-title">Change User Details</h3>

          {/* Name */}
          <div className="detail-row">
            <FaUser />
            <input
              type="text"
              value={user.name}
              disabled
            />
            <FaPen onClick={()=> navigate("/ChangeUserDetails")} className="edit-icon" />
          </div>

          {/* Email */}
          <div className="detail-row">
            <FaEnvelope />
            <input
              type="email"
              value={user.email}
              disabled
            />
            <FaPen className="edit-icon" />
          </div>

          {/* Gender */}
          <div className="detail-row">
            <FaVenusMars />
            <input
              type="text"
              value={user.gender}
              disabled
            />
            <FaPen className="edit-icon" />
          </div>

          {/* Phone */}
          <div className="detail-row">
            <FaPhone />
            <input
              type="text"
              value={user.phone}
              disabled
            />
            <FaPen className="edit-icon" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Account;