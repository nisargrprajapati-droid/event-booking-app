import React, { useState } from "react";
import axios from "axios";
import "./AddGallery.css";

const AddGallery = () => {

  const [galleryName, setGalleryName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!galleryName || !image) {
      alert("Please enter name and select image");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("name", galleryName);
      formData.append("image", image);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gallery/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.success) {
        alert("✅ Image uploaded successfully");

        // RESET FORM
        setGalleryName("");
        setImage(null);
      }

    } catch (error) {
      console.log(error);
      alert("❌ Upload failed");
    }

  };

  return (

    <div className="page-wrapper">

      <div className="page-card">

        <div className="icon-circle">🖼</div>
        <h3>Add Gallery</h3>

        <form onSubmit={handleSubmit}>

          {/* IMAGE INPUT */}
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <span>Choose file</span>
            <span className="choose-pic">
              {image ? image.name : "CHOOSE PIC"}
            </span>
          </label>

          {/* NAME INPUT */}
          <input
            type="text"
            placeholder="Gallery name*"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            className="gallery-input"
          />

          {/* SUBMIT */}
          <button type="submit" className="post-btn">
            POST
          </button>

        </form>

      </div>

    </div>

  );

};

export default AddGallery;