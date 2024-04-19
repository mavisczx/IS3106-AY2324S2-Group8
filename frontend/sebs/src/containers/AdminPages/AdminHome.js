import React from "react";
import buddyImage from "../buddy.jpg";

function AdminHome() {
  return (
    <div
      className="flex justify-center items-center h-screen -m-10"
      style={{
        backgroundImage: `url(${buddyImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black p-8 rounded shadow-md">
        <div className="flex flex-col items-center text-center space-y-1 ">
          <h1 className="text-xl text-white">
            <b>Welcome to ExchangeBuddy</b>
            <p>Admin Homepage.</p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
