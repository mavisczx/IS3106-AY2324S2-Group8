import React, { useEffect, useState } from "react";
import ApiStudent from "../../helpers/ApiStudent";
import { toast } from "react-toastify";
import EventCard from "../../components/EventCard";

const CreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold">{event.eventTitle}</h3>
          <p className="text-gray-600">{event.eventDescription}</p>
          <p className="text-gray-500">
            {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500">Location: {event.eventLocation}</p>
        </div>
      ))}
    </div>
  );
};

export default CreatedEvents;
