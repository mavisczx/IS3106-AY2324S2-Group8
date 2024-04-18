import React, { useEffect, useState } from "react";
import ApiStudent from "../../helpers/ApiStudent";
import ApiEvent from "../../helpers/ApiEvent";
import { toast } from "react-toastify";
import EventCard from "../../components/EventCard";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomDialog from "../../components/CustomDialog";

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
          toast.success("Event deleted successfully!", { autoClose: 1800 });
          fetchEvents(); // Refresh the list after deletion
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const openEditDialog = (event) => {
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedEvent = {
      ...currentEvent,
      eventTitle: e.target.eventTitle.value,
      eventDescription: e.target.eventDescription.value,
      eventLocation: e.target.eventLocation.value,
      eventCategory: e.target.eventCategory.value,
      eventPrice: e.target.eventPrice.value,
    };
    ApiEvent.editEvent(currentEvent.id, updatedEvent, token)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update the event");
        toast.success("Event updated successfully!", { autoClose: 1800 });
        setIsDialogOpen(false);
        fetchEvents(); // Refresh the list after editing
      })
      .catch((error) => {
        toast.error(error.message);
        setIsDialogOpen(false);
      });
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
              onClick={() => openEditDialog(event)}
              className="absolute bottom-2 right-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
            >
              <Icon icon="mdi:pencil-outline" />
            </button>
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
            >
              <Icon icon="mdi:trash-can-outline" />
            </button>
          </div>
        ))}
      </div>
      {isDialogOpen && currentEvent && (
        <CustomDialog
          title="Edit Event"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <form onSubmit={handleEditEvent} className="space-y-4 p-4">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                name="eventTitle"
                defaultValue={currentEvent.eventTitle}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                name="eventDescription"
                defaultValue={currentEvent.eventDescription}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Event Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Location
              </label>
              <input
                type="text"
                name="eventLocation"
                defaultValue={currentEvent.eventLocation}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Event Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Category
              </label>
              <select
                name="eventCategory"
                defaultValue={currentEvent.eventCategory}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="attractions">Attractions</option>
                <option value="festivals">Festivals</option>
                <option value="workshops">Workshops</option>
                <option value="concerts">Concerts</option>
                <option value="theatre">Theatre</option>
                <option value="food">Food</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Event Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Price (Local Currency)
              </label>
              <input
                type="text"
                name="eventPrice"
                defaultValue={currentEvent.eventPrice}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </CustomDialog>
      )}
    </div>
  );
};

export default CreatedEvents;
