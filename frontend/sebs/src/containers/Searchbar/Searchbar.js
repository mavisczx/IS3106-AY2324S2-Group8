
import React, { useState } from "react";
//import "./Searchbar.css";


function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Add your search logic here
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`searchbar ${isExpanded ? "expanded" : ""}`}>
      <div >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-2 border rounded"
        />
        <button className="searchbar-button" onClick={handleExpand}>
          
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
