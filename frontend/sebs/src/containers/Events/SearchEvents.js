import React, { useState, useEffect } from "react";
import ApiEvent from "../../helpers/ApiEvent";
import moment from "moment";
import EventCard from "../../components/EventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchEvents() {
  const [events, setEvents] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    ApiEvent.searchAllEvents().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setEvents(data);
        });
      } else {
        console.error("Error fetching events");
      }
    });
  };

  const handleSearch = () => {
    const searchInput = new URLSearchParams();
    if (searchType === "eventDate") {
      const eventDate = startDate;
      const deadline = endDate;
      ApiEvent.searchEventDate({ eventDate, deadline }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setEvents(data);
          });
        } else {
          console.error("Error fetching events");
        }
      });
    } else if (searchType === "title" || searchType === "location") {
      searchInput.append(searchType, searchValue);
      ApiEvent.searchEvents(searchInput).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setEvents(data);
          });
        } else {
          console.error("Error fetching events");
        }
      });
    } else {
      searchInput.append("category", category);
      ApiEvent.searchEvents(searchInput).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setEvents(data);
          });
        } else {
          console.error("Error fetching events");
        }
      });
    }
  };

  const resetSearch = () => {
    setSearchType("");
    setSearchValue("");
    refreshData();
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Find Events</h1>
      </div>
      <form
        className="flex flex-col md:flex-row gap-3 items-center justify-center"
        onSubmit={handleSearch}
        onReset={resetSearch}
      >
        <select
          id="searchType"
          className="w-full md:w-40 h-10 border-2 border-orange-300 focus:outline-none focus:border-orange-500 text-stone-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          required
        >
          <option value="">Select Search</option>
          <option value="title">Title</option>
          <option value="location">Location</option>
          <option value="eventDate">Event Date</option>
          <option value="category">Category</option>
        </select>
        {searchType === "" ||
        searchType === "title" ||
        searchType === "location" ? (
          <input
            type="text"
            placeholder="Input search"
            className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-orange-300 focus:outline-none focus:border-orange-500"
            required
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        ) : searchType === "eventDate" ? (
          <div className="flex">
            <DatePicker
              placeholderText="Start Date"
              dateFormat="dd/MM/yyyy"
              id="startDate"
              className="w-full md:w-40 px-3 h-10 rounded-l border-2 border-orange-300 focus:outline-none focus:border-orange-500"
              required
              selected={startDate}
              onChange={(e) => {
                setStartDate(e);
              }}
            />
            <DatePicker
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              id="endDate"
              className="w-full md:w-40 ml-3 px-3 h-10 rounded-l border-2 border-orange-300 focus:outline-none focus:border-orange-500"
              required
              onChange={(e) => {
                setEndDate(e);
              }}
            />
          </div>
        ) : (
          <select
            id="categorySelect"
            className="w-full md:w-80 h-10 border-2 border-orange-300 focus:outline-none focus:border-orange-300 text-stone-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option value="">Select Category</option>
            <option value="conferences">Conferences</option>
            <option value="festivals">Festivals</option>
            <option value="workshops">Workshops</option>
            <option value="concerts">Concerts</option>
            <option value="theatre">Theatre</option>
            <option value="others">Others</option>
          </select>
        )}
        <button
          type="submit"
          className="ml-5 bg-orange-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
        >
          Search
        </button>
        <button
          type="reset"
          className="bg-orange-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
        >
          Reset
        </button>
      </form>
      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {events.map((e) => {
            return <EventCard key={e.id} event={e} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchEvents;
