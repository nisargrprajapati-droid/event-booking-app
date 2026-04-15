import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

/* ================= USER COMPONENTS ================= */

import Header from "./Components/User/Header/Header";
import Home from "./Components/User/Home/Home";
import About from "./Components/User/About/About";
import Event from "./Components/User/Event/Event";
import MoreEvent from "./Components/User/MoreEvent/MoreEvent";
import IPL from "./Components/User/IPL/IPL";
import ContactUs from "./Components/User/ContactUs/ContactUs";
import Gallery from "./Components/User/Gallery/Gallery";
import Mybooking from "./Components/User/Mybooking/Mybooking";
import Login from "./Components/User/login/Login";
import Register from "./Components/User/Register/Register";
import Account from "./Components/User/Account/Account";
import Changepw from "./Components/User/Changepw/Changepw";
import ChangeUserDetails from "./Components/User/ChangeUserDetails/ChangeUserDetails";
import CategoryEvents from "./Components/User/CategoryEvents/CategoryEvents";
import UserCategory from "./Components/User/Category/UserCategory";

/* ===== BOOKING SYSTEM ===== */

import BookingSuccess from "./Components/User/BookingSuccess/BookingSuccess";
import UserBookings from "./Components/User/UserBookings/UserBookings";

/* ================= ADMIN COMPONENTS ================= */

import AdminLayout from "./Components/Admin/Admindashboard/AdminLayout";
import Dashboard from "./Components/Admin/Admindashboard/Dashboard";
import Adminlogin from "./Adminlogin/Adminlogin";

import UserList from "./Components/Admin/Userlist/Userlist";
import Addevent from "./Components/Admin/Addevent/Addevent";
import Category from "./Components/Admin/Category/Category";
import AddGallery from "./Components/Admin/AddGallery/AddGallery";
import ContactList from "./Components/Admin/ContactList/ContactList";
import AdminProfile from "./Components/Admin/Profile/AdminProfile";
import ChangePassword from "./Components/Admin/Profile/ChangePassword";

/* ===== ADMIN BOOKING MANAGEMENT ===== */

import AdminBookings from "./Components/Admin/AdminBookings";
import PaymentPage from "./Components/User/Payment/Payment";

const App = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const location = useLocation();

  // Hide header on admin pages
  const hideHeader = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideHeader && <Header user={user} setUser={setUser} />}

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/moreevent" element={<MoreEvent />} />

        {/* ===== CATEGORY ===== */}

        <Route path="/categories" element={<UserCategory />} />
        <Route path="/category/:category" element={<CategoryEvents />} />

        {/* ===== EVENT DETAILS ===== */}

        <Route path="/ipl/:id" element={<IPL />} />

        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* ===== BOOKING ===== */}

        <Route path="/mybooking/:id" element={<Mybooking />} />

        <Route
          path="/booking-success"
          element={user ? <BookingSuccess /> : <Navigate to="/login" />}
        />

        <Route
          path="/my-bookings"
          element={user ? <UserBookings user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/payment" element={<PaymentPage/>} />
        {/* ================= USER AUTH ================= */}

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER PROTECTED ================= */}

        <Route
          path="/account"
          element={user ? <Account user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/changeuserdetails"
          element={
            user
              ? <ChangeUserDetails user={user} setUser={setUser} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/changepw"
          element={user ? <Changepw user={user} /> : <Navigate to="/login" />}
        />

        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin/login"
          element={<Adminlogin setAdmin={setAdmin} />}
        />

        {/* ================= ADMIN PANEL ================= */}

        <Route
          path="/admin"
          element={
            admin
              ? <AdminLayout admin={admin} setAdmin={setAdmin} />
              : <Navigate to="/admin/login" />
          }
        >

          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="addevent" element={<Addevent />} />
          <Route path="category" element={<Category />} />
          <Route path="gallery" element={<AddGallery />} />
          <Route path="contact" element={<ContactList />} />

          {/* ===== BOOKINGS ===== */}

          <Route path="bookings" element={<AdminBookings />} />

          {/* ===== ADMIN PROFILE ===== */}

          <Route path="profile" element={<AdminProfile />} />
          <Route path="profile/password" element={<ChangePassword />} />

        </Route>

      </Routes>
    </>
  );
};

export default App;