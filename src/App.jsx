import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Filters from "./components/filters/Filters";
import RetreatList from "./components/retreatList/RetreatList";
import Pagination from "./components/pagination/Pagination";
import Banner from "./components/banner/Banner";
import "./App.css";

const App = () => {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(true);
  const retreatsPerPage = 3; // Adjusted for better display

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch(
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
        );
        const data = await response.json();
        setRetreats(data);
        setFilteredRetreats(data);

        // Select a random banner image from the fetched retreats
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setBannerImage(data[randomIndex].image);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };
    fetchRetreats();
  }, []);

  useEffect(() => {
    const filteredData = retreats.filter((retreat) => {
      const matchesLocation = locationFilter
        ? retreat.location.toLowerCase() === locationFilter.toLowerCase()
        : true;
      const matchesType = typeFilter ? retreat.type === typeFilter : true;
      const matchesSearch = retreat.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesLocation && matchesType && matchesSearch;
    });

    setFilteredRetreats(filteredData);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [searchTerm, locationFilter, typeFilter, retreats]);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const indexOfLastRetreat = currentPage * retreatsPerPage;
  const indexOfFirstRetreat = indexOfLastRetreat - retreatsPerPage;
  const currentRetreats = Array.isArray(filteredRetreats)
    ? filteredRetreats.slice(indexOfFirstRetreat, indexOfLastRetreat)
    : [];

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading, please wait....</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <div className="banner">
        <Banner bannerImage={bannerImage} />
      </div>
      <div className="filters">
        <Filters
          setLocationFilter={setLocationFilter}
          setTypeFilter={setTypeFilter}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="retreats">
        {currentRetreats.map((retreat) => (
          <RetreatList key={retreat.id} retreat={retreat} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalRetreats={filteredRetreats.length}
        retreatsPerPage={retreatsPerPage}
        handlePageChange={handlePageChange}
      />
      <footer className="footer">
        <p>© 2024 Wellness Retreats. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
