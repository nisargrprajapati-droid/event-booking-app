import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Slidebar from "../Slidebar/Slidebar";
import "./AdminLayout.css";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation(); // ✅ for active highlight later

  const [notifications, setNotifications] = useState([]);
  const [showBox, setShowBox] = useState(false);

  /* ================= GET NOTIFICATIONS ================= */
  const getNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <Slidebar activePath={location.pathname} />

      {/* RIGHT AREA */}
      <div className="admin-main">

        {/* HEADER */}
        <div className="admin-header">

          {/* Search */}
          <input
            type="text"
            className="admin-search"
            placeholder="🔍 Search anything..."
          />

          <div className="header-right">

            {/* NOTIFICATION */}
            <div className="notification-wrapper">

              <FaBell
                className="notification-icon"
                onClick={() => setShowBox(!showBox)}
              />

              {/* COUNT */}
              {notifications?.length > 0 && (
                <span className="notification-badge">
                  {notifications.length}
                </span>
              )}

              {/* DROPDOWN */}
              {showBox && (
                <div className="notification-box">

                  <h4>Notifications</h4>

                  {notifications?.length === 0 && (
                    <p className="empty">No notifications</p>
                  )}

                  {notifications?.map((n) => (
                    <div key={n._id} className="notification-item">
                      <strong>{n.title}</strong>
                      <p>{n.message}</p>
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* PROFILE */}
            <div
              className="admin-profile"
              onClick={() => navigate("/admin/profile")}
            >
              <div className="profile-circle">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <p>Event Management</p>
              </div>
            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;