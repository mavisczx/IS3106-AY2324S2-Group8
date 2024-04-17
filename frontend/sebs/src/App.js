import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Index from "./containers/Index";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="bg-stone-300 min-h-screen min-v-screen flex">
      <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="content-wrapper w-full m-10">
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/register" element={<Index />} />

          <Route path="/" element={<Index />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
