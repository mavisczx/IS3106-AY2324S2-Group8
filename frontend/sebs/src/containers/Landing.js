import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../components/Button";
import CustomDialog from "../components/CustomDialog";
import Searchbar from "./Searchbar/Searchbar";
import Timeline from "./Timeline/Timeline";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-col">
          <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 ">
            <Searchbar />
          </div>
          <div className="border-t border-orange-200 my-4"></div>
            <Timeline />
          </div>
        </div>
      </div>
  );
}

export default Landing;
