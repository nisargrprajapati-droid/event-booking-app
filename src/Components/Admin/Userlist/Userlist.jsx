import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Userlist.css";

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/user";

  // ================= GET USERS =================
  const getUsers = async () => {
    try {

      const res = await axios.get(`${API}/all`);

      if (res.data.success) {
        setUsers(res.data.users);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ================= BLOCK USER =================
  const toggleBlock = async (id) => {
    try {

      await axios.patch(`${API}/block/${id}`);

      getUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {

    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/delete/${id}`);

      getUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= SEARCH FILTER =================
  const filteredUsers = users.filter((user) =>
  (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
  (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
);

  return (
    <div className="page-wrapper">

      {/* HEADER SECTION */}
      <div className="user-header">

        <h2>User List</h2>

        <div className="user-tools">

          {/* TOTAL USERS */}
          <span className="user-count">
            Total Users: {users.length}
          </span>

          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />

        </div>

      </div>

      <div className="admin-table-wrapper">

        <table className="admin-table">

          <thead>
            <tr>
              <th>No</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user, index) => (

              <tr key={user._id}>

                <td>{index + 1}</td>

                <td>
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                    className="avatar"
                  />
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>

                <td>

                  <button
                    className="block-btn"
                    onClick={() => toggleBlock(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
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

export default UserList;