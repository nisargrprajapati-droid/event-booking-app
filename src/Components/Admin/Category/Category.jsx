import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";
import { FaTrash } from "react-icons/fa";

const Category = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  // ================= GET CATEGORY =================

  const getCategories = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/category");

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

  // ================= ADD CATEGORY =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !image) {
      alert("Enter category name and image");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/category",
        formData
      );

      alert("Category Created");

      setName("");
      setImage(null);

      getCategories();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE CATEGORY =================

  const handleDelete = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/api/category/${id}`);

      getCategories();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-container">

      {/* ===== CATEGORY FORM ===== */}

      <form className="category-form" onSubmit={handleSubmit}>

        <h3>Add Category</h3>

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">POST</button>

      </form>

      {/* ===== CATEGORY TABLE ===== */}

      <table className="category-table">

        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {categories.map((cat, index) => (

            <tr key={cat._id}>

              <td>{index + 1}</td>

              <td>
                <img
                  src={cat.image}
                  width="50"
                  alt="category"
                />
              </td>

              <td>{cat.name}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cat._id)}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Category;