import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Index from "./containers/Index";
import Login from "./containers/Authentication/Login";
import Register from "./containers/Authentication/Register";
import Profile from "./containers/Profile";
import AdminLogin from "./containers/Authentication/AdminLogin";
import CreateEvent from "./containers/Events/CreateEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="bg-stone-300 min-h-screen min-v-screen flex">
      <ToastContainer theme="dark" />
      <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="content-wrapper w-full m-10">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
