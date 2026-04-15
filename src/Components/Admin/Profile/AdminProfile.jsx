import "./Profile.css";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-card">

      <h3>Personal Details</h3>

      <div className="profile-form">
        <div>
          <label>Full Name</label>
          <input type="text" value="Event Management" />
        </div>

        <div>
          <label>Email Address</label>
          <input type="email" value="event@gmail.com" />
        </div>

        <button className="update-btn">Update</button>

        <button
          className="password-btn"
          onClick={() => navigate("/admin/profile/password")}
        >
          Change Password
        </button>

      </div>

    </div>
  );
};

export default AdminProfile;