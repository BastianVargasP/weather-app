import "./WeatherInfo.css";
import errorIcon from "../assets/images/icon-error.svg";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

const WeatherInfo = () => {
  const { loading, error } = useContext(WeatherContext);

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
        <WeatherDetails />
        <DailyForecast />
      </div>

      <div className={`hourlyForecast${loading ? " isLoading" : ""}`}>
        <HourlyForecast />
      </div>
    </div>
  );
};

export default WeatherInfo;