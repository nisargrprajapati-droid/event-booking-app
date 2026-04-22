import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactList.css";

const ContactList = () => {

  const [contacts, setContacts] = useState([]);

  /* ================= GET CONTACTS ================= */
  const getContacts = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact/list`
      );

      console.log("CONTACT RESPONSE:", res.data);

      // ✅ SAFE HANDLING (VERY IMPORTANT)
      const data = res.data?.contacts || res.data?.data || res.data;

      setContacts(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log("Error fetching contacts:", err);
      setContacts([]); // prevent crash
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  /* ================= DELETE ================= */
  const deleteContact = async (id) => {

    if (window.confirm("Delete this message?")) {

      try {

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/contact/delete/${id}`
        );

        alert("Deleted successfully");
        getContacts();

      } catch (error) {
        console.log(error);
        alert("Error deleting contact");
      }

    }

  };

  return (

    <div className="page-wrapper">

      <h2 className="page-title">Contact List</h2>

      <div className="admin-table-wrapper">

        <table className="admin-table">

          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {/* ✅ SAFE MAP */}
            {Array.isArray(contacts) && contacts.length > 0 ? (

              contacts.map((contact, index) => (

                <tr key={contact._id}>

                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>

                  <td>
                    {contact.message?.length > 40
                      ? contact.message.substring(0, 40) + "..."
                      : contact.message}
                  </td>

                  <td>
                    {contact.createdAt
                      ? new Date(contact.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No contacts found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ContactList;