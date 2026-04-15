import React from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Slidebar.css";
import {
  FaUsers,
  FaCalendarAlt,
  FaImage,
  FaTags,
  FaEnvelope,
  FaSignOutAlt
} from "react-icons/fa";

const Slidebar = () => {

  const navigate = useNavigate();

  // 🔐 Logout Function
  const handleLogout = () => {

    // remove authentication data
    Cookies.remove("accessToken");
    Cookies.remove("userId");

    localStorage.removeItem("user");

    // redirect to login page
    navigate("/admin/login");

  };

  return (

    <div className="admin-sidebar">

      <div className="admin-logo">
        Admin
      </div>

      <div className="admin-nav">

        <NavLink to="/admin/users" className="admin-link">
          <FaUsers /> User List
        </NavLink>

        <NavLink to="/admin/addevent" className="admin-link">
          <FaCalendarAlt /> Event Post
        </NavLink>

        <NavLink to="/admin/category" className="admin-link">
          <FaTags /> Post Category
        </NavLink>

        <NavLink to="/admin/gallery" className="admin-link">
          <FaImage /> Add Gallery
        </NavLink>
      
        <NavLink to="/admin/bookings" className="admin-link">
          <FaImage />Bookings
        </NavLink>
        <NavLink to="/admin/contact" className="admin-link">
          <FaEnvelope /> Contact List
        </NavLink>

      </div>

      {/* Logout Button */}
      <div className="admin-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </div>

    </div>

  );

};

export default Slidebar;