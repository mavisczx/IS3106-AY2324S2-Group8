import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../Searchbar/Searchbar";
import Timeline from "../Timeline/Timeline";
import { Link } from "react-router-dom";

function AdminLanding() {
  return (
    <div className="landing">
      <div className="landing__navWraper">
        <Searchbar />
        <Link to="/Landing" className="text-orange-600 hover:text-orange-800">
          {" "}
          View Posts{" "}
        </Link>
      </div>
      <div className="landing__timeline">
        <Timeline />
      </div>
    </div>
  );
}

export default AdminLanding;
