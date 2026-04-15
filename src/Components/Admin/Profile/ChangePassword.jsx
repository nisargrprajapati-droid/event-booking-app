import "./Profile.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      <div className="profile-avatar"></div>

      <div className="profile-tabs">
        <button onClick={() => navigate("/admin/profile")}>
          Personal Detail
        </button>
        <button className="active">Change Password</button>
      </div>

      <h3>Change Password</h3>

      <div className="profile-form">
        <div>
          <label>Old Password</label>
          <input type="password" />
        </div>

        <div>
          <label>New Password</label>
          <input type="password" />
        </div>

        <div>
          <label>Confirm New Password</label>
          <input type="password" />
        </div>

        <button className="update-btn">Update</button>
      </div>
    </div>
  );
};

export default ChangePassword;
