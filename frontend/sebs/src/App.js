import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Index from "./containers/Index";
import Login from "./containers/Authentication/Login";
import Register from "./containers/Authentication/Register";
import Profile from "./containers/Profile";
import AdminLogin from "./containers/Authentication/AdminLogin";
import CreateEvent from "./containers/Events/CreateEvent";
import Landing from "./containers/Landing";
import CreateAdmin from "./containers/AdminPages/CreateAdmin";
import SearchEvents from "./containers/Events/SearchEvents";
import EventDetails from "./containers/Events/EventDetails";
import CreatedEvents from "./containers/Events/CreatedEvents";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Convert truth or false value to boolean
  }, []);

  return (
    <div className="bg-stone-300 min-h-screen min-v-screen flex">
      <ToastContainer theme="dark" />
      <Sidebar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <div className="content-wrapper w-full m-10">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/adminlogin"
            element={
              <AdminLogin setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />
            }
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/createevent"
            element={
              loggedIn ? (
                <CreateEvent />
              ) : (
                <div>
                  You need to be logged in to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route path="/" element={<Index />} />
          <Route
            path="/profile"
            element={
              loggedIn ? (
                <Profile />
              ) : (
                <div>
                  You need to be logged in to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/createadmin"
            element={
              loggedIn && isAdmin ? (
                <CreateAdmin />
              ) : (
                <div>
                  You need to be logged in / be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route path="/searchevents" element={<SearchEvents />} />
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/createdevents" element={<CreatedEvents />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
