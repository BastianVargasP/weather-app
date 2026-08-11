import search from "../assets/images/icon-search.svg";
import "./Header.css";
import { WeatherContext } from "../assets/context/WeatherContext";
import { useContext, useEffect, useState } from "react";

const Header = () => {
  const { placesList, askPlace, selectPlace } = useContext(WeatherContext); 

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
          />
          <div id="resultsPlaces" className="placeList">
          {placesList.results &&
            placesList.results.map((place) => (
              <button key={place.id} onClick={() => selectPlace(place)}>
                <img src={`https://open-meteo.com/images/country-flags/${place.country_code.toLowerCase()}.svg`} alt="" />
                <h3>
                  {place.name}, {place.country}
                </h3>
              </button>
            ))}
        </div>
        </div>
        <button className="searchButton" onClick={() => askPlace()}>
          Search
        </button>
        
      </div>
    </div>
  );
};

export default Header;
