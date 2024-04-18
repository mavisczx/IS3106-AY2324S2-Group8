import React, { useEffect, useState } from "react";
import ApiEvent from "../helpers/ApiEvent";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getEventSize();
    console.log("Event size: ", eventSize);
  }, []);

  const getEventSize = () => {
    console.log("Getting event size");
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

  return (
    <div class="rounded overflow-hidden shadow-lg">
      <Link to="/eventdetails"></Link> {/*put the link to details page */}
      <div class="relative">
        <Link to="/eventdetails">
          {" "}
          {/*put the link to details page */}
          <img
            class="w-full"
            src="https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
            alt="Category picture"
          />
          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </Link>

        <div class="absolute bottom-0 left-0 bg-indigo-500 bg-opacity-80 px-4 py-2 text-white text-sm">
          {eventCategory}
        </div>

        <a href="!#">
          <div class="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            <span class="font-bold">27</span>
            <small>March</small>
          </div>
        </a>
      </div>
      <div class="px-6 py-4">
        <a
          href="#"
          class="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
        >
          Best View in Newyork City
        </a>
        <p class="text-gray-500 text-sm">The city that never sleeps</p>
      </div>
      <div class="px-6 py-4 flex flex-row items-center">
        <span class="ml-1">6 mins ago</span>
      </div>
    </div>
  );
}

export default EventCard;
