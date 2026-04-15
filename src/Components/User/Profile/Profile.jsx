const Profile = ({ user }) => {
  return (
    <div style={{ padding: "120px 50px" }}>
      <h2>Welcome, {user.fullName}</h2>

      <img
        src="https://i.pravatar.cc/120"
        alt="profile"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default Profile;