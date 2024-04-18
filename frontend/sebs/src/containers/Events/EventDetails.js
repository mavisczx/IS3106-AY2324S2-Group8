import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiEvent from "../../helpers/ApiEvent";
import moment from "moment";
import workshop_image from "../../Images/workshop.jpg";
import concert_image from "../../Images/concert.jpg";
import festival_image from "../../Images/festival.jpg";
import theatre_image from "../../Images/theatre.jpg";
import other_image from "../../Images/other.jpg";
import food_image from "../../Images/food.jpg";
import attraction_image from "../../Images/attraction.jpg";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    ApiEvent.getEventById(id, token).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const { eventDate, deadline } = data;
          data.eventDate = eventDate.substring(0, eventDate.length - 5);
          data.eventDate = moment(data.eventDate).format("DD/MM/YYYY");
          data.deadline = deadline.substring(0, deadline.length - 5);
          data.deadline = moment(data.deadline).format("DD/MM/YYYY");
          setEvent(data);
        });
      } else {
        console.error("Error fetching event");
      }
    });
  }, [id]);

  const categoryImages = {
    attractions: attraction_image,
    festivals: festival_image,
    workshops: workshop_image,
    concerts: concert_image,
    theatre: theatre_image,
    others: other_image,
    food: food_image,
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen -m-10">
      <div className="flex flex-col justify-center items-center">
        <div className="py-12 max-w-4xl mx-auto">
          {/* Event Image */}
          <img
            className="w-full object-cover h-96 rounded-lg shadow-md"
            src={categoryImages[event.eventCategory]}
            alt="Event"
          />

          {/* Event Content */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold leading-tight">
              {event.eventTitle}
            </h1>
            <p className="mt-2 text-gray-600">{event.eventDescription}</p>

            <div className="mt-4">
              <span className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Date: {event.eventDate}
              </span>
              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Location: {event.eventLocation}
              </span>
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Price: {event.eventPrice}
              </span>
              <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 ml-2 rounded-full uppercase font-semibold tracking-wide">
                Category: {event.eventCategory}
              </span>
            </div>

            {/* Registration Button and Deadline */}
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
              <span className="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                Deadline: {event.deadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
