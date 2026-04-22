import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserCategory.css";

const UserCategory = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {

      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/category");

      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else {
        setCategories([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (

    <div className="category-page">

      <h2>Event Categories</h2>

      <div className="category-grid">

        {categories.map((cat) => (

          <div
            key={cat._id}
            className="category-card"
            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)} // ✅ FIX
          >

            <img
              src={cat.image || "https://via.placeholder.com/300"}
              alt={cat.name}
            />

            <h3>{cat.name}</h3>

          </div>

        ))}

      </div>

    </div>

  );
};

export default UserCategory;