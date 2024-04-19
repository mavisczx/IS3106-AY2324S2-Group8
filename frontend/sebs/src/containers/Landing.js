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
        <Timeline />
      </div>
    
  );
}

export default Landing;
