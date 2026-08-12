import "./WeatherInfo.css";
import errorIcon from "../assets/images/icon-error.svg";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";
import { getDayName } from "../utils/dates";

const WeatherInfo = () => {
  const { placeInfo, findImgWeather, loading, error } = useContext(WeatherContext);

  return (
    <div className="weatherContainer">
      {error && (
        <div className="statusMessage error">
          <img src={errorIcon} alt="Error" className="statusIcon" />
          <p>{error}</p>
        </div>
      )}

      <div className={`weatherInfo${loading ? " isLoading" : ""}`}>
        {loading && (
          <div className="loadingOverlay">
            <div className="spinner"></div>
          </div>
        )}

        <CurrentWeather />
        <div className="weatherDetails">
          <div className="detail">
            <h4>Feels Like</h4>
            <p>
              {placeInfo ? placeInfo?.current.apparent_temperature : "-"}{" "}
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
                    <h4>{getDayName(placeInfo.daily.time[index]).slice(0, 3)}</h4>
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

      <div className={`hourlyForecast${loading ? " isLoading" : ""}`}>
        <HourlyForecast />
      </div>
    </div>
  );
};

export default WeatherInfo;