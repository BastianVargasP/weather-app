import { useState } from "react";

export function useGeocoding() {
  const [placesList, setPlacesList] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const fetchPlace = async (place) => {
    if (!place.trim()) return;
    setSearchError(null);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=5&language=en&format=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo buscar el lugar");
      const data = await res.json();
      setPlacesList(data);
    } catch (err) {
      setSearchError("No se pudo encontrar el lugar. Intenta de nuevo.");
      setPlacesList([]);
    }
  };

  return { placesList, setPlacesList, fetchPlace, searchError };
}