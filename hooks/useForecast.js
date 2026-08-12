import { useState } from "react";

export function useForecast({ switchDegrees, switchVelocity, switchPrecipitation }) {
  const [placeInfo, setPlaceInfo] = useState();
  const [placeData, setPlaceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectPlace = async (place) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&temperature_unit=${switchDegrees}&wind_speed_unit=${switchVelocity}&precipitation_unit=${switchPrecipitation}&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo obtener el clima");
      const data = await res.json();

      setPlaceData({
        name: place.name,
        country: place.country,
        country_code: place.country_code,
      });
      setPlaceInfo(data);
    } catch (err) {
      setError("No se pudo cargar el clima. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { placeInfo, placeData, selectPlace, loading, error };
}