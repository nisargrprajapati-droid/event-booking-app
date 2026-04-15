import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactList.css";

const ContactList = () => {

  const [contacts, setContacts] = useState([]);

  const getContacts = () => {

    axios.get("http://localhost:5000/api/contact/list")
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log("Error fetching contacts:", err);
      });

  };

  useEffect(() => {
    getContacts();
  }, []);

  const deleteContact = async (id) => {

    if (window.confirm("Delete this message?")) {

      try {

        await axios.delete(`http://localhost:5000/api/contact/delete/${id}`);

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

            {contacts.map((contact, index) => (

              <tr key={contact._id}>

                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>

                <td>
                  {contact.message.length > 40
                    ? contact.message.substring(0, 40) + "..."
                    : contact.message}
                </td>

                <td>
                  {new Date(contact.createdAt).toLocaleDateString()}
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

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ContactList;