import search from "../assets/images/icon-search.svg";
import "./Header.css";
import { WeatherContext } from "../assets/context/WeatherContext";
import { useContext, useState } from "react";

const Header = () => {
  const { placesList, fetchPlace, selectPlace, loading } = useContext(WeatherContext);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    fetchPlace(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="header">
      <h1>How's the sky looking today?</h1>
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
          <div
            id="resultsPlaces"
            className={`placeList${placesList.results?.length ? " isVisible" : ""}`}
          >
            {placesList.results &&
              placesList.results.map((place) => (
                <button key={place.id} onClick={() => selectPlace(place)}>
                  <img
                    src={`https://open-meteo.com/images/country-flags/${place.country_code.toLowerCase()}.svg`}
                    alt=""
                  />
                  <h3>
                    {place.name}, {place.country}
                  </h3>
                </button>
              ))}
          </div>
        </div>
        <button className="searchButton" onClick={handleSearch} disabled={loading}>
          {loading ? "Cargando..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default Header;
