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
import ThreadLanding from "./containers/ThreadLanding";
import CreateAdmin from "./containers/AdminPages/CreateAdmin";
import SearchEvents from "./containers/Events/SearchEvents";
import CreatePost from "./containers/Post/CreatePost";
import CreateThread from "./containers/Thread/CreateThread";
import EventDetails from "./containers/Events/EventDetails";
import CreatedEvents from "./containers/Events/CreatedEvents";
import RegisteredEvents from "./containers/Events/RegisteredEvents";
import AdminHome from "./containers/AdminPages/AdminHome";
import AdminCreateEvent from "./containers/AdminPages/AdminCreateEvent";
import AdminCreatedEvents from "./containers/AdminPages/AdminCreatedEvents";
import AdminSearchEvents from "./containers/AdminPages/AdminSearchEvents";
import AdminEventDetails from "./containers/AdminPages/AdminEventDetails";
import PostsinThreads from "./containers/Post/PostsinThreads";

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
            path="/admin/home"
            element={
              loggedIn && isAdmin ? (
                <AdminHome />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/admin/createadmin"
            element={
              loggedIn && isAdmin ? (
                <CreateAdmin />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/admin/createevent"
            element={
              loggedIn && isAdmin ? (
                <AdminCreateEvent />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/admin/createdevents"
            element={
              loggedIn && isAdmin ? (
                <AdminCreatedEvents />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/admin/searchevents"
            element={
              loggedIn && isAdmin ? (
                <AdminSearchEvents />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route
            path="/admin/eventdetails/:id"
            element={
              loggedIn && isAdmin ? (
                <AdminEventDetails />
              ) : (
                <div>
                  You need to be an admin to access this page.{" "}
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
          <Route path="/searchevents" element={<SearchEvents />} />

          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/createthread" element={<CreateThread />} />
          <Route path="/threadlanding" element={<ThreadLanding />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/createdevents" element={<CreatedEvents />} />
          <Route path="/registeredevents" element={<RegisteredEvents />} />
          <Route path="/postsinthread/:id" element={<PostsinThreads />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
