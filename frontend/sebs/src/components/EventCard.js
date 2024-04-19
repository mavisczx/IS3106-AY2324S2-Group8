import React, { useEffect, useState } from "react";
import ApiEvent from "../helpers/ApiEvent";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Icon } from "@iconify/react";
import workshop_image from "../Images/workshop.jpg";
import concert_image from "../Images/concert.jpg";
import festival_image from "../Images/festival.jpg";
import theatre_image from "../Images/theatre.jpg";
import other_image from "../Images/other.jpg";
import food_image from "../Images/food.jpg";
import attraction_image from "../Images/attraction.jpg";

function EventCard({ event }) {
  const {
    id,
    eventTitle,
    eventDate,
    deadline,
    eventDescription,
    eventLocation,
    eventCategory,
    eventPrice,
  } = event;
  const [eventSize, setEventSize] = useState(0);
  const [threadId, setThreadId] = useState(0);

  useEffect(() => {
    getEventSize();
    getThreadId();
  }, []);

  const getEventSize = () => {
    ApiEvent.getEventSize(id).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setEventSize(data);
        });
      } else {
        console.error("Error fetching event size");
      }
    });
  };

  const getThreadId = () => {
    const token = localStorage.getItem("token");
    ApiEvent.getThreadId(id, token).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setThreadId(data);
        });
      } else {
        console.error("Error fetching thread id");
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const formattedDate = moment
      .tz(dateString, "YYYY-MM-DDTHH:mm:ssz[UTC]", "UTC")
      .toDate();
    return moment(formattedDate);
  };

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
    <div className="rounded overflow-hidden shadow-lg">
      <Link to={`/eventdetails/${id}`}></Link>
      <div className="relative">
        <Link to={`/eventdetails/${id}`}>
          <img
            className="w-full"
            src={categoryImages[eventCategory]}
            alt="Category picture"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-35"></div>
        </Link>

        <div className="absolute bottom-0 left-0 bg-orange-500 bg-opacity-80 px-4 py-2 text-white text-sm">
          {eventCategory}
        </div>

        <div className="text-sm absolute top-0 right-0 bg-orange-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
          <span className="font-bold">
            {formatDate(eventDate).format("DD")}
          </span>
          <small>{formatDate(eventDate).format("MM/YYYY")}</small>
        </div>
      </div>
      <div className="px-6 py-4 bg-stone-100">
        <Link
          to={`/eventdetails/${id}`}
          className="font-semibold text-lg inline-block hover:text-orange-600 transition duration-500 ease-in-out"
        >
          {eventTitle}
        </Link>
        <p className="text-gray-500 text-sm flex items-center">
          <Icon icon="ic:baseline-people" />
          &nbsp;
          {eventSize} Joined
        </p>

        <p className="text-gray-500 text-sm flex items-center">
          <Icon icon="mdi:location" />
          &nbsp;
          {eventLocation}
        </p>
        <p className="text-gray-500 text-sm flex items-center">
          <Icon icon="tabler:currency-dollar-singapore" />
          &nbsp;
          {eventPrice}
        </p>
        {/* Button to link to the corresponding thread */}
        <div className="text-left mt-4">
          <Link
            to={`/postsinthread/${threadId}`}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            🧵Go to Thread
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
