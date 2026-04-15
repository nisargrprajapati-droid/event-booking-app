import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Changepw.css";

function Changepassword() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    let id = Cookies.get("userId");

    if (!id) {

      const user = localStorage.getItem("user");

      if (user) {

        const parsed = JSON.parse(user);
        id = parsed.id;

        if (id) {
          Cookies.set("userId", id);
        }

      }

    }

    setUserId(id);

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {

      setLoading(true);

      const token = Cookies.get("accessToken");

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

      setFormData({
        currentPassword: "",
        newPassword: ""
      });

      navigate("/account");

    } catch (error) {

      console.log("Error:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="change-pass-wrapper">

      <div className="change-pass-box">

        <div className="icon-box">
          🔒
        </div>

        <h2 className="title">Change Password</h2>

        <form onSubmit={handleSubmit}>

          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            className="input-box"
            placeholder="Enter Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            className="input-box"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="change-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default Changepassword;