import React from 'react'

const Pro = () => {
  return (
    <div>
      <div
  className="user-info"
  onMouseEnter={() => setDropdown(true)}
  onMouseLeave={() => setDropdown(false)}
>
  {user ? (
    <div className="profile-box">
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="profile-img"
      />
      <span className="profile-name">
        {user.fullName}
      </span>

      {dropdown && (
        <div className="dropdown-menu">
          <div onClick={() => navigate("/Account")}>Account</div>
          <div onClick={() => navigate("/mybooking")}>My Booking</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  ) : (
    <button
      className="username"
      onClick={() => navigate("/login")}
    >
      LOGIN
    </button>
  )}
</div>

    </div>
  )
}

export default Pro
