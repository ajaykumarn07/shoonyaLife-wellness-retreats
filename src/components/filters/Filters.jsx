import React, { useEffect, useState } from "react";
import "./Filters.css";

const Filters = ({ setLocationFilter, setTypeFilter, setSearchTerm }) => {
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
        );
        const data = await response.json();
        const uniqueLocations = [
          ...new Set(data.map((retreat) => retreat.location)),
        ];
        const uniqueTypes = [...new Set(data.map((retreat) => retreat.type))];
        setLocations(uniqueLocations);
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-select">
        <select onChange={handleLocationChange}>
          <option value="">Filter by Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select onChange={handleTypeChange}>
          <option value="">Filter by Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search retreats by title"
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Filters;
