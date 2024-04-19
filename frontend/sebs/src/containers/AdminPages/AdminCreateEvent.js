import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "@iconify/react";
import ApiEvent from "../../helpers/ApiEvent";
import createEventBg from "../Events/createevent.jpg"; // Ensure the path is correct

const AdminCreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventDate: null,
    eventLocation: "",
    eventDescription: "",
    deadline: null,
    eventCategory: "",
    eventPrice: "",
  });

  const adminCreateEventForm = useRef(null);

  const handleChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Authentication token not found.");
    }

    if (moment(eventData.eventDate).isBefore(moment(), "day")) {
      return toast.error("Event date cannot be in the past");
    }

    if (moment(eventData.deadline).isAfter(eventData.eventDate)) {
      return toast.error("Deadline cannot be after the event date");
    }

    try {
      const formattedEventData = {
        ...eventData,
        eventDate: moment(eventData.eventDate).format("YYYY-MM-DDTHH:mm:ss"),
        deadline: moment(eventData.deadline).format("YYYY-MM-DDTHH:mm:ss"),
      };
      console.log(formattedEventData);
      await ApiEvent.adminCreateEvent(formattedEventData, token);
      toast.success("🎉 Event added successfully!");
      adminCreateEventForm.current.reset();
    } catch (error) {
      toast.error("❌ Error adding event: " + error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-white-100 -m-10"
      style={{
        backgroundImage: `url(${createEventBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-3xl p-6 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          <div className="p-2.5 mt-1 flex items-center justify-center">
            <Icon
              icon="ic:baseline-school"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-stone-200 text-2xl ml-3">
              ExchangeBuddy
            </h1>
          </div>
          <h1 className="text-center font-bold text-white text-xl ml-3">
            Create Event
          </h1>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-1"
          ref={adminCreateEventForm}
        >
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Title:
            </label>
            <input
              type="text"
              name="eventTitle"
              value={eventData.eventTitle}
              onChange={(e) => handleChange("eventTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Date:
            </label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={eventData.eventDate}
              onChange={(date) => handleChange("eventDate", date)}
              className="form-input w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Location:
            </label>
            <input
              type="text"
              name="eventLocation"
              value={eventData.eventLocation}
              onChange={(e) => handleChange("eventLocation", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Description:
            </label>
            <textarea
              name="eventDescription"
              value={eventData.eventDescription}
              onChange={(e) => handleChange("eventDescription", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Category:
            </label>
            <select
              name="eventCategory"
              value={eventData.eventCategory}
              onChange={(e) => handleChange("eventCategory", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="attractions">Attractions</option>
              <option value="festivals">Festivals</option>
              <option value="workshops">Workshops</option>
              <option value="concerts">Concerts</option>
              <option value="theatre">Theatre</option>
              <option value="food">Food</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Event Price (Local Currency):
            </label>
            <input
              type="text"
              name="eventPrice"
              placeholder="e.g., 50.00"
              value={eventData.eventPrice}
              onChange={(e) => handleChange("eventPrice", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Registration Deadline:
            </label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={eventData.deadline}
              onChange={(date) => handleChange("deadline", date)}
              className="form-input w-full px-3 py-2 border border-gray-300 rounded mb-4"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateEvent;
