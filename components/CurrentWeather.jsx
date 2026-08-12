import sunny from "../assets/images/icon-sunny.webp";
import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";
import { getDayName } from "../utils/dates";

const CurrentWeather = () => {
  const { placeData, placeInfo, days, months, findImgWeather } =
    useContext(WeatherContext);

  return (
    <div className="currentWeather">
      <div className="location">
        {placeInfo ? (
          <>
            <h2>
              {placeData.name}, {placeData.country}
            </h2>

            <h3>
              {getDayName(placeInfo?.hourly.time[0].slice(0, 10))},{" "}
              {months[new Date(placeInfo?.hourly.time[0]).getMonth()]}{" "}
              {new Date(placeInfo?.hourly.time[0]).getDate()},{" "}
              {new Date(placeInfo?.hourly.time[0]).getFullYear()}
            </h3>
          </>
        ) : null}
      </div>
      <div className="temperature">
        {placeInfo ? (
          <>
            <img
              src={
                placeInfo
                  ? findImgWeather(placeInfo?.current.weather_code)
                  : sunny
              }
              alt="Sunny icon"
              className="weatherIcon"
            />
            <h1>
              {placeInfo?.current.temperature_2m}{" "}
              {placeInfo?.current_units.temperature_2m}
            </h1>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CurrentWeather;
