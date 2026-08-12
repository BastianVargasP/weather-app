import { useContext } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const { placeInfo, days, changeDay, findImgWeather, daySelected } =
    useContext(WeatherContext);

  return (
    <>
      <div className="hourlySelection">
        <h4>Hourly forecast</h4>
        <select
          name="dayList"
          id="dayList"
          value={daySelected}
          onChange={changeDay}
          style={!placeInfo ? { width: "min-width" } : null}
        >
          {placeInfo ? (
            <>
              {placeInfo?.daily.time.map((_, index) => (
                <option value={index} key={`option${index + 1}`}>
                  {days[new Date(placeInfo.daily.time[index]).getDay()]}
                </option>
              ))}
            </>
          ) : (
            <option value="-" disabled hidden>
              -
            </option>
          )}
        </select>
      </div>
      <div className="hourlyList">
        {placeInfo ? (
          <>
            {placeInfo.hourly.time
              .slice(daySelected * 24, daySelected * 24 + 24)
              .map((_, i) => {
                const realIndex = i + daySelected * 24;
                const isNow =
                  placeInfo.hourly.time[realIndex].slice(0, 13) ===
                  placeInfo.current.time.slice(0, 13);

                return (
                  <div
                    className={`hourlyItem${isNow ? " current" : ""}`}
                    key={realIndex}
                  >
                    <div className="hourlyTime">
                      <img
                        src={findImgWeather(
                          placeInfo.hourly.weather_code[realIndex],
                        )}
                        alt="Sunny icon"
                        className="hourlyIcon"
                      />
                      <h4>{placeInfo.hourly.time[realIndex].slice(11)}</h4>
                    </div>
                    <p>
                      {placeInfo.hourly.temperature_2m[realIndex]}{" "}
                      {placeInfo.hourly_units.temperature_2m}
                    </p>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {Array.from({ length: 23 }).map((_, i) => (
              <div className="hourlyItem" key={i}></div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default HourlyForecast;
