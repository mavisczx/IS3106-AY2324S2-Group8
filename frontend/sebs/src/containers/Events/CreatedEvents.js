import React, { useEffect, useState } from "react";
import ApiStudent from "../../helpers/ApiStudent";
import ApiEvent from "../../helpers/ApiEvent";
import { toast } from "react-toastify";
import EventCard from "../../components/EventCard";
import { Icon } from "@iconify/react";
import CustomDialog from "../../components/CustomDialog"; // Make sure this is correctly imported

const CreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to see this page.");
      return;
    }

    ApiStudent.listAllEventsCreated(token)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const token = localStorage.getItem("token");
      ApiEvent.studentDeleteEvent(eventId, token)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete the event");
          toast.success("Event deleted successfully!", {
            autoClose: 1800,
          });
          fetchEvents(); // Refresh the list after deletion
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const openEditDialog = (event) => {
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative rounded overflow-hidden shadow-lg"
          >
            <EventCard event={event} />
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
            >
              <Icon icon="mdi:trash-can-outline" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedEvents;
