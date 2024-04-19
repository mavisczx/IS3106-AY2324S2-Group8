import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button";
import CustomDialog from "../components/CustomDialog";
import Searchbar from "./Searchbar/Searchbar";
import Timeline from "./Timeline/Timeline";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import LandingBg from "./gradient.jpg"; 

function Landing() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-4 border-gray-400 border-solid" style={{ backgroundImage: `url(${LandingBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bg-transparent rounded-lg shadow-md p-4 mb-4 border-4 border-orange-500 border-solid relative">
            <Searchbar />
          </div>
        </div>
        <div className="border-t border-orange-500 my-4 relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-200"></div>
        </div>
        <Timeline />
      </div>
    </div>
  );
}

export default Landing;
