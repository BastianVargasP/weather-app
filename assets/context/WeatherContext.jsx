import { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [placesList, setPlacesList] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [placeInfo, setPlaceInfo] = useState();
  const [placeData, setPlaceData] = useState({});
  
  const [switchDegrees, setSwitchDegrees] = useState("celsius");
  const [switchVelocity, setSwitchVelocity] = useState("kmh");
  const [switchPrecipitation, setSwitchPrecipitation] = useState("mm");
  const [switchUnits, setSwitchUnits] = useState("Metric");
  
  const [daySelected, setDaySelected] = useState();

  const days = [    
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const months = [
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


  function changeDay(e) {
    const dayList = document.querySelector("#dayList");
    setDaySelected(e.target.value);
  }

  function findImgWeather(number) {
    switch (number) {
      case 0:
      case 1:
        return "../assets/images/icon-sunny.webp";
        break;
      case 2:
        return "../assets/images/icon-partly-cloudy.webp";
        break;
      case 3:
        return "../assets/images/icon-overcast.webp";
        break;
      case 45:
      case 48:
        return "../assets/images/icon-fog.webp";
        break;
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return "../assets/images/icon-drizzle.webp";
        break;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return "../assets/images/icon-rain.webp";
        break;
      case 71:
      case 73:
      case 75:
      case 77:
        return "../assets/images/icon-snow.webp";
        break;
      case 80:
      case 81:
      case 82:
        return "../assets/images/icon-rain.webp";
        break;
      case 85:
      case 86:
        return "../assets/images/icon-snow.webp";
        break;
      case 95:
      case 96:
      case 99:
        return "../assets/images/icon-storm.webp";
        break;
    }
  }

  //change units
  const toggleUnits = () => {
    if (switchUnits === "Metric") {
      setSwitchUnits("Imperial");
    } else {
      setSwitchUnits("Metric");
    }
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

  // Handle search place here
  const askPlace = () => {
    const placeInput = document.querySelector(".searchInput");
    // console.log(placeInput.value);
    fetchPlace(placeInput.value);
  };

  // Fetch place data here
  const fetchPlace = async (place) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=5&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    setPlacesList(data);
    // console.log(data);
  };

  // Handle place selection here
  const selectPlace = async (place) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&temperature_unit=${switchDegrees}&wind_speed_unit=${switchVelocity}&precipitation_unit=${switchPrecipitation}`;
    const res = await fetch(url);
    const data = await res.json();
    const placeData = {
      name: `${place.name}`,
      country: `${place.country}`,
      country_code : `${place.country_code}`
    };
    setPlaceData(placeData);
    setPlaceInfo(data);
    // console.log(data);
    setPlacesList([]);
  };

  // toggle visibility on places list
  useEffect(() => {
    const placeList = document.querySelector("#resultsPlaces");
    if (Object.keys(placesList).length > 0) {
      placeList.classList.add("isVisible");
    } else {
      placeList.classList.remove("isVisible");
    }
  }, [placesList]);

  return (
    <WeatherContext.Provider
      value={{
        placesList,
        setPlacesList,
        askPlace,
        fetchPlace,
        selectPlace,
        placeInfo,
        placeData,
        days,
        months,
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
        findImgWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
