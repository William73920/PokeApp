import React from "react";
import "./Pokesearch.css";

const Pokesearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="pokesearch">
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for your favorite Pokemon"
      />
    </div>
  );
};

export default Pokesearch;
