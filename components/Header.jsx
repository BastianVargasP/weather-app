import search from "../assets/images/icon-search.svg";
import "./Header.css";
import { WeatherContext } from "../assets/context/WeatherContext";
import { useContext, useState } from "react";
import PlaceResultsList from "./PlaceResultsList";

const Header = () => {
  const { fetchPlace, loading } = useContext(WeatherContext);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    fetchPlace(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="header">
      <div className="search">
        <div className="inputContainer">
          <img src={search} alt="Search icon" className="inputIcon" />
          <input
            type="text"
            placeholder="Search for a place..."
            className="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <PlaceResultsList />
        </div>
        <button className="searchButton" onClick={handleSearch} disabled={loading}>
          {loading ? "Cargando..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default Header;