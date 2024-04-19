import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

function SidebarLink({ name, icon, onClick, link, isCollapsed }) {
  const location = useLocation();
  const active = location.pathname === link ? "bg-orange-600" : "";

  return (
    <Link onClick={onClick} to={link}>
      <div
        className={`${active} flex items-center p-2.5 mt-3 rounded-md cursor-pointer hover:bg-orange-600 text-white`}
      >
        <Icon icon={icon} className="text-lg" />
        {!isCollapsed && <span className="ml-4 font-bold">{name}</span>}
      </div>
    </Link>
  );
}

function Sidebar({ loggedIn, setLoggedIn, isAdmin, setIsAdmin }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar sticky top-0 bottom-0 lg:left-0 p-4 ${
        isCollapsed ? "w-20" : "w-72"
      } transition-all duration-250 overflow-hidden bg-stone-900`}
      style={{
        transition:
          "width 0.4s ease-in-out, opacity 0.4s ease-in-out, margin 0.4s ease-in-out",
        position: "relative",
        zIndex: "1000",
      }}
    >
      <div className="flex justify-center">
        <Icon
          icon="ic:baseline-people"
          className="text-xl rounded-md text-orange-500"
          style={{
            opacity: isCollapsed ? 1 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
        {!isCollapsed && (
          <span className="ml-3 font-bold text-stone-200">ExchangeBuddy</span>
        )}
      </div>

      <div className="my-2 bg-stone-600 h-0.5"></div>

      {loggedIn ? (
        <>
          {!isAdmin && (
            <>
              <SidebarLink name="Profile" icon="mdi:account" link="/profile" />
              <SidebarLink
                name="Add Event"
                icon="mdi:plus"
                link="/createevent"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Created Events"
                icon="mdi:clipboard-list"
                link="/createdevents"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Search"
                icon="mdi:search"
                link="/"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Questions"
                icon="mdi:question-mark"
                link="/"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Search Events"
                icon="mdi:event"
                link="/searchevents"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Registered Events"
                icon="mdi:heart-outline"
                link="/registeredevents"
                isCollapsed={isCollapsed}
              />
            </>
          )}
          {isAdmin && (
            <>
              <SidebarLink
                name="Create Admin"
                icon="mdi:plus"
                link="/admin/createadmin"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Add Event"
                icon="mdi:plus"
                link="/admin/createevent"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Created Events"
                icon="mdi:clipboard-list"
                link="/admin/createdevents"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                name="Search Events"
                icon="mdi:event"
                link="/admin/searchevents"
                isCollapsed={isCollapsed}
              />
            </>
          )}
          <SidebarLink
            name="Log Out"
            icon="mdi:logout"
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
              setIsAdmin(false);
            }}
            link="/login"
            isCollapsed={isCollapsed}
          />
        </>
      ) : (
        <>
          <SidebarLink
            name="Log In"
            icon="mdi:login"
            link="/login"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            name="Sign Up"
            icon="mdi:account-plus"
            link="/register"
            isCollapsed={isCollapsed}
          />
        </>
      )}

      {/* Toggle Sidebar button at the bottom */}
      <button onClick={toggleSidebar} className="absolute bottom-5 right-7">
        <Icon
          icon={isCollapsed ? "mdi:menu" : "mdi:menu-open"}
          className="text-white text-xl"
        />
      </button>
    </div>
  );
}

export default Sidebar;
