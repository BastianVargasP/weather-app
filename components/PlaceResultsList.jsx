import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

const PlaceResultsList = () => {
  const { placesList, selectPlace } = useContext(WeatherContext);

  return (
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
  );
};

export default PlaceResultsList;