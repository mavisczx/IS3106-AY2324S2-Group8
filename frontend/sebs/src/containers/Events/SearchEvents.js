import React, { useState, useEffect } from "react";
import ApiEvent from "../../helpers/ApiEvent";
import moment from "moment";
import EventCard from "../../components/EventCard";

function SearchEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    ApiEvent.searchAllEvents().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          for (const event of data) {
            const { eventDate, deadline } = event;
            event.eventDate = eventDate.substring(0, eventDate.length - 5);
            event.eventDate = moment(event.eventDate).format("DD/MM/YYYY");
            event.deadline = deadline.substring(0, deadline.length - 5);
            event.deadline = moment(event.deadline).format("DD/MM/YYYY");
          }
          setEvents(data);
        });
      } else {
        console.error("Error fetching events");
      }
    });
  };

  return (
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {events.map((e) => {
          return <EventCard key={e.id} event={e} />;
        })}
      </div>
    </div>
  );
}

export default SearchEvents;
