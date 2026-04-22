import React, { useState } from "react";
import "./Register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, gender, phone, password } = formData;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        { name, email, gender, phone, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Axios only reaches here for 2xx responses
      alert("Registration Successful");
      navigate("/login");

    } catch (err) {
      console.error(err);

      // 👇 Axios gives structured errors
      if (err.response) {
        // Backend responded with error status
        alert(err.response.data?.message || "Registration failed");
      } else if (err.request) {
        // Request sent but no response
        alert("Cannot connect to server");
      } else {
        // Something else went wrong
        alert("Unexpected error");
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </div>

        <label className="gender-label">Gender</label>
        <div className="gender-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              required
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
            />{" "}
            Other
          </label>
        </div>

        <div className="input-group">
          <FaPhone className="icon" />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>

        <div className="remember">
          <label>
            <input
              type="checkbox"
              name="remember"
              onChange={handleChange}
            />{" "}
            Remember Me
          </label>
        </div>

        <button type="submit" className="signup-btn">
          Register
        </button>

        <p className="signin-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
