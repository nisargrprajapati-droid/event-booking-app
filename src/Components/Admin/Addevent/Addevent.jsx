import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Addevent.css";

const Addevent = () => {

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    category: "",
    date: "",
    time: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editEvent, setEditEvent] = useState(null);

  /* ================= GET EVENTS ================= */
  const getEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= GET CATEGORIES ================= */
  const getCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/category`);

      const data = res.data?.data || res.data;
      setCategories(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };

  useEffect(() => {
    getEvents();
    getCategories();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= CREATE EVENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      if (image) data.append("image", image);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, data);

      alert("Event Created ✅");

      setFormData({
        title: "",
        price: "",
        location: "",
        category: "",
        date: "",
        time: ""
      });

      setImage(null);
      setPreview(null);

      getEvents();

    } catch (error) {
      console.log(error);
      alert("Error creating event ❌");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
    getEvents();
  };

  /* ================= STATUS ================= */
  const toggleStatus = async (id) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/events/status/${id}`);
    getEvents();
  };

  /* ================= ADMIN PRICE ================= */
  const updateAdminPrice = async (id, price) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/admin-price/${id}`,
        { price }
      );
      getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= UPDATE EVENT ================= */
  const handleUpdate = async () => {
    try {

      const data = new FormData();

      data.append("title", editEvent.title);
      data.append("location", editEvent.location);
      data.append("category", editEvent.category);
      data.append("date", editEvent.date);
      data.append("time", editEvent.time);

      if (image) {
        data.append("image", image);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${editEvent._id}`,
        data
      );

      alert("Event Updated ✅");

      setEditEvent(null);
      setImage(null);
      setPreview(null);

      getEvents();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addevent-page">

      <div className="event-form">
        <h2>Post Event</h2>

        <form onSubmit={handleSubmit}>

          <input type="file" onChange={handleImage} required />

          {preview && (
            <img src={preview} alt="preview" className="preview-img" />
          )}

          <input type="text" name="title" placeholder="Title"
            value={formData.title} onChange={handleChange} required />

          <input type="text" name="location" placeholder="Location"
            value={formData.location} onChange={handleChange} required />

          <input type="number" name="price" placeholder="Price"
            value={formData.price} onChange={handleChange} required />

          <input type="date" name="date"
            value={formData.date} onChange={handleChange} required />

          <input type="time" name="time"
            value={formData.time} onChange={handleChange} required />

          <select name="category"
            value={formData.category}
            onChange={handleChange} required>

            <option value="">Select Category</option>

            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}

          </select>

          <button type="submit">POST EVENT</button>

        </form>
      </div>

      <div className="event-list">

        <h2>All Events</h2>

        <table>

          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Admin Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {events.map((event, index) => (

              <tr key={event._id}>

                <td>{index + 1}</td>

                <td>
                  {event.image && (
                    <img src={event.image} alt="" width="60" />
                  )}
                </td>

                <td>{event.title}</td>
                <td>{event.category}</td>

                <td>
                  <input
                    type="number"
                    defaultValue={event.adminPrice}
                    onBlur={(e) =>
                      updateAdminPrice(event._id, e.target.value)
                    }
                  />
                </td>

                <td>{event.status}</td>

                <td>

                  <button onClick={() => setEditEvent(event)}>
                    Edit
                  </button>

                  <button onClick={() => toggleStatus(event._id)}>
                    {event.status === "active" ? "Deactivate" : "Activate"}
                  </button>

                  <button onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {editEvent && (
        <div className="popup">
          <div className="popup-content">

            <h2>Edit Event</h2>

            <input
              type="text"
              value={editEvent.title}
              onChange={(e) =>
                setEditEvent({ ...editEvent, title: e.target.value })
              }
            />

            <input
              type="text"
              value={editEvent.location}
              onChange={(e) =>
                setEditEvent({ ...editEvent, location: e.target.value })
              }
            />

            <input
              type="date"
              value={editEvent.date}
              onChange={(e) =>
                setEditEvent({ ...editEvent, date: e.target.value })
              }
            />

            <input
              type="time"
              value={editEvent.time}
              onChange={(e) =>
                setEditEvent({ ...editEvent, time: e.target.value })
              }
            />

            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditEvent(null)}>Cancel</button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Addevent;