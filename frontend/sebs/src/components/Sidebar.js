import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarLink({ name, icon, onClick, link }) {
  const location = useLocation();
  return (
    <Link onClick={onClick} to={link}>
      <div className={location.pathname === link && "bg-orange-600"}>
        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-orange-600 text-white">
          <i class="bi bi-house-door-fill"></i>

          <span class="text-[15px] ml-4 text-stone-200 font-bold">
            <div className="flex flex-row space-x-2 items-center align-center">
              <Icon icon={icon} className="text-lg" /> <span>{name}</span>{" "}
            </div>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Sidebar({ loggedIn, setLoggedIn }) {
  return (
    <div
      class="sidebar sticky top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-stone-900"
      key={loggedIn}
    >
      <Link to="/">
        <div class="text-stone-100 text-xl">
          <div class="p-2.5 mt-1 flex items-center">
            <Icon
              icon="ic:baseline-people"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 class="font-bold text-stone-200 text-[15px] ml-3">
              exchangemates
            </h1>
          </div>
          <div class="my-2 bg-stone-600 h-[1px]"></div>
        </div>
      </Link>

      {loggedIn ? (
        <div>
          <SidebarLink name="Search" icon="mdi:search" link="/" />

          <SidebarLink name="Questions" icon="mdi:question-mark" link="/" />
          <SidebarLink name="Events" icon="mdi:event" link="/" />
          <SidebarLink name="Chat" icon="mdi:bubble" link="/" />

          <SidebarLink
            name="Log Out"
            icon=""
            onClick={() => {
              //localStorage.removeItem('token');
              setLoggedIn(false);
            }}
            link="/login"
          />
        </div>
      ) : (
        <div>
          <SidebarLink name="Log In" icon="" link="/login" />
          <SidebarLink name="Sign Up" icon="" link="/signup" />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
