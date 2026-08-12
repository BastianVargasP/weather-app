import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";
import { getDayName } from "../utils/dates";

const DailyForecast = () => {
  const { placeInfo, findImgWeather } = useContext(WeatherContext);

  return (
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
                  alt=""
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
  );
};

export default DailyForecast;