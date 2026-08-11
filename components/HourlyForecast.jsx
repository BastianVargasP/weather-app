import { useContext, useEffect } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";

const HourlyForecast = () => {
  const { placeInfo, days, changeDay, findImgWeather, daySelected } = useContext(WeatherContext);

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
                <option
                  value={days[new Date(placeInfo.daily.time[index]).getDay()]}
                  key={`option${index + 1}`}
                >
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
            {placeInfo?.hourly.time
              .slice(
                Number(dayList.selectedIndex) * 24,
                Number(dayList.selectedIndex) * 24 + 24,
              )
              .map((_, i) => {
                const realIndex = i + Number(dayList.selectedIndex) * 24;

                return (
                  <div className="hourlyItem" key={realIndex}>
                    <div className="hourlyTime">
                      <img
                        src={findImgWeather(
                          placeInfo?.hourly.weather_code[realIndex],
                        )}
                        alt="Sunny icon"
                        className="hourlyIcon"
                      />
                      <h4>{placeInfo?.hourly.time[realIndex].slice(11)}</h4>
                    </div>
                    <p>
                      {placeInfo?.hourly.temperature_2m[realIndex]}{" "}
                      {placeInfo?.hourly_units.temperature_2m}
                    </p>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
            <div className="hourlyItem"></div>
          </>
        )}
      </div>
    </>
  );
};

export default HourlyForecast;