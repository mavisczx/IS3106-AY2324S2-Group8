import React, { useEffect, useState } from "react";
import ApiAdmin from "../../helpers/ApiAdmin";
import ApiEvent from "../../helpers/ApiEvent";
import { toast } from "react-toastify";
import AdminEventCard from "../../components/AdminEventCard";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomDialog from "../../components/CustomDialog";

const AdminCreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to see this page.");
      return;
    }

    ApiAdmin.getCreatedEvents(token)
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

  const openDelete = (event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    const token = localStorage.getItem("token");
    ApiEvent.adminDeleteEvent(eventId, token)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete the event");
        toast.success("Event deleted successfully!", { autoClose: 1800 });
        fetchEvents(); // Refresh the list after deletion
        setIsDeleteDialogOpen(false);
      })
      .catch((error) => toast.error(error.message));
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
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Created Events</h1>
      </div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {events.length === 0 && (
          <div className="text-center text-gray-500">
            You have not created any events yet. Start creating now!
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative rounded overflow-hidden shadow-lg"
            >
              <AdminEventCard event={event} />
              <button
                onClick={() => openEditDialog(event)}
                className="absolute bottom-2 right-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
              >
                <Icon icon="mdi:pencil-outline" />
              </button>
              <button
                onClick={() => openDelete(event)}
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
        {isDeleteDialogOpen && currentEvent && (
          <CustomDialog
            title="Unregister from Event"
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
          >
            {/* Content of the dialog */}
            <div className="space-y-4 p-5">
              <div className="mt-3 text-center">
                <p class="text-md text-gray-500">
                  Are you sure you want to delete this event?
                </p>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDeleteEvent(currentEvent.id)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </CustomDialog>
        )}
      </div>
    </>
  );
};

export default AdminCreatedEvents;
