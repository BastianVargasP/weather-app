import { createContext, useEffect, useState, useMemo } from "react";
import sunny from "../images/icon-sunny.webp";
import partlyCloudy from "../images/icon-partly-cloudy.webp";
import overcast from "../images/icon-overcast.webp";
import fog from "../images/icon-fog.webp";
import drizzle from "../images/icon-drizzle.webp";
import rain from "../images/icon-rain.webp";
import snow from "../images/icon-snow.webp";
import storm from "../images/icon-storm.webp";
import { useGeocoding } from "../../hooks/useGeocoding";
import { useForecast } from "../../hooks/useForecast";

export const WeatherContext = createContext();

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WeatherProvider = ({ children }) => {
  const [switchDegrees, setSwitchDegrees] = useState("celsius");
  const [switchVelocity, setSwitchVelocity] = useState("kmh");
  const [switchPrecipitation, setSwitchPrecipitation] = useState("mm");
  const [switchUnits, setSwitchUnits] = useState("Metric");
  const [daySelected, setDaySelected] = useState(0);

  const { placesList, setPlacesList, fetchPlace, searchError } = useGeocoding();
  const { placeInfo, placeData, selectPlace, loading, error } = useForecast({
    switchDegrees,
    switchVelocity,
    switchPrecipitation,
  });

  function changeDay(e) {
    setDaySelected(Number(e.target.value));
  }

  function findImgWeather(number) {
    switch (number) {
      case 0:
      case 1:
        return sunny;
      case 2:
        return partlyCloudy;
      case 3:
        return overcast;
      case 45:
      case 48:
        return fog;
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return drizzle;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return rain;
      case 71:
      case 73:
      case 75:
      case 77:
        return snow;
      case 80:
      case 81:
      case 82:
        return rain;
      case 85:
      case 86:
        return snow;
      case 95:
      case 96:
      case 99:
        return storm;
      default:
        return sunny;
    }
  }

  const toggleUnits = () => {
    setSwitchUnits((prev) => (prev === "Metric" ? "Imperial" : "Metric"));
  };

  useEffect(() => {
    if (switchUnits === "Metric") {
      setSwitchDegrees("celsius");
      setSwitchVelocity("kmh");
      setSwitchPrecipitation("mm");
    } else {
      setSwitchDegrees("fahrenheit");
      setSwitchVelocity("mph");
      setSwitchPrecipitation("inch");
    }
  }, [switchUnits]);

  // Al elegir un lugar, limpiamos la lista de resultados y reseteamos el día
  const handleSelectPlace = async (place) => {
    await selectPlace(place);
    setPlacesList([]);
    setDaySelected(0);
  };

  const contextValue = useMemo(
    () => ({
      placesList,
      fetchPlace,
      selectPlace: handleSelectPlace,
      placeInfo,
      placeData,
      days: DAYS,
      months: MONTHS,
      toggleUnits,
      switchUnits,
      switchDegrees,
      switchVelocity,
      switchPrecipitation,
      setSwitchDegrees,
      setSwitchVelocity,
      setSwitchPrecipitation,
      daySelected,
      setDaySelected,
      changeDay,
      findImgWeather,
      loading,
      error: error || searchError,
    }),
    [
      placesList,
      placeInfo,
      placeData,
      switchUnits,
      switchDegrees,
      switchVelocity,
      switchPrecipitation,
      daySelected,
      loading,
      error,
      searchError,
    ],
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
