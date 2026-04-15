import { useState } from "react";
import "./Adminlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setAdmin }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      if (res.data.success) {

        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        setAdmin(res.data.admin);

        alert("Admin Login Successful");

        navigate("/admin/dashboard");

      }

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }
  };

  return (
    <div className="admin-login-container">

      <form onSubmit={handleSubmit}>

        <h3 className="h">Admin Login</h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default AdminLogin;