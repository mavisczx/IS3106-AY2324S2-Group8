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

//the same as landing, but incase thread has a diff layout
function ThreadLanding(){
return (

    <div className="landing">
        <div className="landing__navWraper">
            <Searchbar />
            <Link
            to="/ThreadLanding"
            className="text-orange-600 hover:text-orange-800"
          >

        </div>
        <div className="landing__timeline">
            <Timeline />
        </div>
    </div>
)

}


export default ThreadLanding;
