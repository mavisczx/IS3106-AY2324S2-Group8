import React from "react";
import { useEffect, useState } from "react";


//import Api from "../helpers/API";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from "../components/Button";
import CustomDialog from "../components/CustomDialog";
import "./Landing.css";
import Searchbar from "./Searchbar/Searchbar";
import Timeline from "./Timeline/Timeline";
import { Icon } from "@iconify/react";

import { Link } from "react-router-dom";

   
function Landing(){
return (

    <div className="landing">
        <div className="landing__navWraper">
            <Searchbar />
            <div className= "swapToThreads">
            <Link to="/ThreadLanding" className="text-orange-600 hover:text-orange-800"> View Threads </Link>
            </div>
        </div>
        <div className="landing__timeline">
            <Timeline />
        </div>
    </div>
)

}


export default Landing;
