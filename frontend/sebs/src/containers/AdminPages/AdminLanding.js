import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../Searchbar/Searchbar";
import AdminTimeline from "../AdminPages/AdminTimeline";

function AdminLanding() {
  return (
    <div className="landing">
      <div className="landing__navWraper"></div>
      <div className="landing__timeline">
        <AdminTimeline />
      </div>
    </div>
  );
}

export default AdminLanding;
