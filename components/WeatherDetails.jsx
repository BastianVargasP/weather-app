import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

const WeatherDetails = () => {
  const { placeInfo } = useContext(WeatherContext);

  return (
    <div className="weatherDetails">
      <div className="detail">
        <h4>Feels Like</h4>
        <p>
          {placeInfo ? parseInt(placeInfo?.current.apparent_temperature) : "-"}{" "}
          {placeInfo?.current_units.apparent_temperature}
        </p>
      </div>
      <div className="detail">
        <h4>Humidity</h4>
        <p>
          {placeInfo ? placeInfo?.current.relative_humidity_2m : "-"}{" "}
          {placeInfo?.current_units.relative_humidity_2m}
        </p>
      </div>
      <div className="detail">
        <h4>Wind</h4>
        <p>
          {placeInfo ? parseInt(placeInfo?.current.wind_speed_10m) : "-"}{" "}
          {placeInfo?.current_units.wind_speed_10m}
        </p>
      </div>
      <div className="detail">
        <h4>Precipitation</h4>
        <p>
          {placeInfo ? parseInt(placeInfo?.current.precipitation) : "-"}{" "}
          {placeInfo?.current_units.precipitation}
        </p>
      </div>
    </div>
  );
};

export default WeatherDetails;