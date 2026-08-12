import "./WeatherInfo.css";
import sunny from "../assets/images/icon-sunny.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";
import background from "../assets/images/bg-today-large.svg";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

const WeatherInfo = () => {
  const {
    placeInfo,
    days,
    daySelected,
    setDaySelected,
    changeDay,
    findImgWeather,
  } = useContext(WeatherContext);

  return (
    <div className="weatherContainer">
      <div className="weatherInfo">
        <CurrentWeather />
        <div className="weatherDetails">
          <div className="detail">
            <h4>Feels Like</h4>
            <p>
              {placeInfo
                ? parseInt(placeInfo?.current.apparent_temperature)
                : "-"}{" "}
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
        <div className="dailyForecast">
          <h2>Daily Forecast</h2>
          <div className="forecastList">
            {placeInfo ? (
              <>
                {placeInfo.daily.time.map((_, index) => (
                  <div className="forecastItem" key={`day${index}`}>
                    <h4>
                      {days[
                        new Date(placeInfo.daily.time[index] + "T00:00:00").getDay()
                      ].slice(0, 3)}
                    </h4>
                    <img
                      src={findImgWeather(placeInfo.daily.weather_code[index])}
                      className="forecastIcon"
                    />
                    <div className="tempRange">
                      <p className="maxTemp">
                        {`${parseInt(placeInfo.daily.temperature_2m_max[index])}°`}
                      </p>
                      <p className="minTemp">
                        {`${parseInt(placeInfo.daily.temperature_2m_min[index])}°`}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
                <div className="forecastItem"></div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hourlyForecast">
        <HourlyForecast />
      </div>
    </div>
  );
};

export default WeatherInfo;
