import sunny from "../assets/images/icon-sunny.webp";
import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

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
              {days[new Date(placeInfo?.hourly.time[0]).getDay()]},{" "}
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
                  ? findImgWeather(placeInfo?.daily.weather_code[0])
                  : sunny
              }
              alt="Sunny icon"
              className="weatherIcon"
            />
            <h1>
              {parseInt(placeInfo?.current.temperature_2m)}{" "}
              {placeInfo?.current_units.temperature_2m}
            </h1>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CurrentWeather;
