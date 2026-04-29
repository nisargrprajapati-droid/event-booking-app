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

  // ✅ FETCH CURRENT USER FROM BACKEND
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!user?.id) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getcurrentUser/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);

      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        gender: res.data.user.gender || "",
        phone: res.data.user.phone || "",
      });

    } catch (error) {
      console.log("FETCH USER ERROR:", error);
    }
  };

  // ✅ LOAD USER DATA
  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  }, [user]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User updated successfully ✅");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/account");

    } catch (error) {
      console.log("ERROR BLOCK:", error);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="change-container">

      <form className="change-form" onSubmit={handleSubmit}>
        <h2>Change User Details</h2>

        <div className="input-group">
          <label>User Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Mobile No</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Update Details
        </button>

      </form>

    </div>
  );
}

export default ChangeUserDetails;