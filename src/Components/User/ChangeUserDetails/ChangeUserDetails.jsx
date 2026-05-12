import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChangeUserDetails.css";
import { useNavigate } from "react-router-dom";

function ChangeUserDetails({ user, setUser }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });

  /* ================= FETCH CURRENT USER ================= */

  const fetchUser = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!user?._id) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getcurrentUser/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CURRENT USER:", res.data);

      const currentUser = res.data.user;

      setUser(currentUser);

      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        phone: currentUser.mobile_number || "",
      });

    } catch (error) {

      console.log("FETCH USER ERROR:", error);

    }
  };

  /* ================= LOAD USER ================= */

  useEffect(() => {

    if (user?._id) {
      fetchUser();
    }

  }, [user]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  /* ================= UPDATE USER ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update/${user._id}`,
        {
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          mobile_number: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User updated successfully ✅");

      console.log("UPDATED USER:", res.data);

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/account");

    } catch (error) {

      console.log("UPDATE ERROR:", error);

      alert("Update failed ❌");

    }
  };

  return (

    <div className="change-container">

      <form
        className="change-form"
        onSubmit={handleSubmit}
      >

        <h2>Change User Details</h2>

        {/* USER NAME */}

        <div className="input-group">

          <label>User Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

        </div>

        {/* EMAIL */}

        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

        </div>

        {/* GENDER */}

        <div className="input-group">

          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* PHONE */}

        <div className="input-group">

          <label>Mobile No</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
          />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="update-btn"
        >
          Update Details
        </button>

      </form>

    </div>

  );
}

export default ChangeUserDetails;