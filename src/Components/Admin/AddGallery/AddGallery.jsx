import React, { useState } from "react";
import axios from "axios";
import "./AddGallery.css";

const AddGallery = () => {

const [galleryName, setGalleryName] = useState("");
const [image, setImage] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();


};

return ( <div className="page-wrapper">


  <div className="page-card">

    <div className="icon-circle">🔒</div>
    <h3>Add Gallery</h3>

    <form onSubmit={handleSubmit}>

      <label className="upload-box">
        <input
          type="file"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />

        <span>Choose file</span>
        <span className="choose-pic">CHOOSE PIC</span>
      </label>

      <input
        type="text"
        placeholder="Gallery name*"
        value={galleryName}
        onChange={(e) => setGalleryName(e.target.value)}
        className="gallery-input"
      />

      <button type="submit" className="post-btn">
        POST
      </button>

    </form>

  </div>

</div>


);
};

export default AddGallery;
