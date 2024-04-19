import React, { useState, useEffect } from "react";
import ApiStudent from "../../helpers/ApiStudent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import EventCard from "../../components/EventCard";
import CustomDialog from "../../components/CustomDialog";

function RegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const openUnregister = () => {
    setIsDialogOpen(true);
  };

  const handleUnregister = (eId) => {
    const token = localStorage.getItem("token");

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
          setIsDialogOpen(false);
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
                onClick={() => openUnregister()}
                className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
              >
                <Icon icon="mdi:trash-can-outline" />
              </button>
              {isDialogOpen && (
                <CustomDialog
                  title="Unregister from Event"
                  open={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                >
                  {/* Content of the dialog */}
                  <div className="space-y-4 p-5">
                    <div className="mt-3 text-center">
                      <p class="text-md text-gray-500">
                        Are you sure you want to unregister from this event?
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => handleUnregister(event.id)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </CustomDialog>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RegisteredEvents;
