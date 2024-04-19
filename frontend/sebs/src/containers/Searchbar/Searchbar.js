import React, { useState, useEffect } from "react";
import ApiThread from "../../helpers/ApiThread";
import Thread from "../Thread/Thread";
import moment from "moment";
import { Icon } from "@iconify/react";

import "react-datepicker/dist/react-datepicker.css";

function Searchbar() {
  const [threads, setThreads] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    ApiThread.getAllThread().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setThreads(data);
        });
      } else {
        console.error("Error fetching events");
      }
    });
  };

  const handleSearch = () => {
    const searchInput = new URLSearchParams();
    searchInput.append("tag", tag);
    ApiThread.searchThread(searchInput).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setThreads(data);
        });
      } else {
        console.error("Error fetching events");
      }
    });
  };

  const resetSearch = () => {
    setTag("");
    refreshData();
  };

  return (
    <div>
      <div className="text-center mb-8">
        {/* Add any additional content or components here */}
      </div>
      <form
        className="flex flex-col md:flex-row gap-3 items-center justify-center"
        onSubmit={handleSearch}
        onReset={resetSearch}
      >
        <div className="flex items-center w-full md:w-80 h-10 border-2 border-orange-300 focus-within:border-orange-500 bg-white text-stone-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
          <Icon icon="mdi:magnify" className="text-orange-500 mr-2" />
          <select
            id="categorySelect"
            className="w-full h-full border-none focus:outline-none bg-white text-stone-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            onChange={(e) => {
              setTag(e.target.value);
            }}
            required
          >
            <option value="">Select Thread Type</option>
            <option value="event">Event</option>
            <option value="opinion">Opinion</option>
            <option value="question">Question</option>
            <option value="rant">Rant</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2 transition-colors duration-300"
          >
            Search
          </button>
          <button
            type="reset"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2 transition-colors duration-300"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {threads.map((e) => {
            return <Thread key={e.id} event={e} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
