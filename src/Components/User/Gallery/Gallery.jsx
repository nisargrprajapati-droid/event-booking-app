import React, { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 2; // ✅ only 2 images per page

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/gallery/all`)
      .then(res => res.json())
      .then(data => setImages(data.images || []))
      .catch(err => console.log(err));
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="main">

      <h2>Gallery</h2>

      <div className="gallery">

        {currentImages.length > 0 ? (
          currentImages.map((item) => (
            <div className="card" key={item._id}>
              <img src={item.image} alt="" />
              <h4>{item.name}</h4>
            </div>
          ))
        ) : (
          <p>No images</p>
        )}

      </div>

      {/* ✅ Pagination */}
      <div className="pagination">

        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅ Prev
        </button>

        <span>Page {page} / {totalPages}</span>

        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next ➡
        </button>

      </div>

    </div>
  );
}

export default Gallery;