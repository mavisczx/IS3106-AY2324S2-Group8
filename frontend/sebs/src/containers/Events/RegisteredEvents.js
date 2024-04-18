import React, { useState, useEffect } from "react";
import ApiStudent from "../../helpers/ApiStudent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import EventCard from "../../components/EventCard";

function RegisteredEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = () => {
    const token = localStorage.getItem("token");
    ApiStudent.viewAllEventsRegistered(token).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setEvents(data);
        });
      } else {
        console.error("Error fetching registered events");
      }
    });
  };

  const handleUnregister = (eId) => {
    const token = localStorage.getItem("token");
    if (window.confirm(`Do you want to unregister from event?`)) {
      try {
        ApiStudent.unregisterForEvent(eId, token).then((res) => {
          if (res.ok) {
            toast.success("Unregistered from event successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
            });
            reloadData();
          } else if (res.status === 404) {
            toast.error("Error unregistering from event", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
            });
          }
        });
      } catch (error) {
        console.error("Error unregistering from event", error);
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Registered Events</h1>
      </div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative rounded overflow-hidden shadow-lg"
            >
              <EventCard event={event} />
              <button
                onClick={() => handleUnregister(event.id)}
                className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
              >
                <Icon icon="mdi:trash-can-outline" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RegisteredEvents;
