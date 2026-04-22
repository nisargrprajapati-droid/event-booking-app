import React, { useState } from "react";
import "./Login.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login({ setUser }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* ================= HANDLE LOGIN ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        formData
      );

      console.log("Login response:", res.data);

      if (res.data.token) {

        /* ===== SAVE TOKEN ===== */

        Cookies.set("accessToken", res.data.token);

        /* ===== SAVE USER ===== */

        localStorage.setItem("user", JSON.stringify(res.data.user));

        /* ===== SAVE USER ID ===== */

        Cookies.set("userId", res.data.user.id);

        alert("User login successfully!");

        /* ================= REDIRECT SYSTEM ================= */

        const redirectEvent = localStorage.getItem("redirectEvent");

        if (redirectEvent) {

          navigate(`/ipl/${redirectEvent}`);

          localStorage.removeItem("redirectEvent");

        } else {

          navigate("/");

        }

      }

    } catch (error) {

      console.log("Login Error:", error);

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  /* ================= UI ================= */

  return (

    <div className="signin-container">

      <form className="signin-box" onSubmit={handleSubmit}>

        <div className="signin-icon">
          <FaLock size={35} color="#7b2cbf" />
        </div>

        <h3 className="signin-title">Login</h3>

        <input
          type="email"
          name="email"
          className="signin-input"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="signin-input"
          placeholder="Password*"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="signin-btn" type="submit">
          LOGIN
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </form>

    </div>

  );

}

export default Login;