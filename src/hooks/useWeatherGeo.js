"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

const CACHE_KEY = "portfolio_weather_data";
const CACHE_TTL = 15 * 60 * 1000;
const DEFAULT_LAT = -6.252832;
const DEFAULT_LON = 106.796543;

function formatCityDisplay(cityName) {
  if (!cityName) return "Jakarta, ID";
  if (
    cityName.includes("Daerah Khusus Ibukota Jakarta") ||
    cityName.includes("DKI Jakarta") ||
    cityName.includes("Jakarta")
  ) {
    return "Jakarta, ID";
  }
  return cityName.replace(/^Kota\s+/i, "").replace(/^Kabupaten\s+/i, "");
}

function subscribeToStorage(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredWeatherSnapshot() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? raw : null;
  } catch {
    return null;
  }
}

function getEmptyServerSnapshot() {
  return null;
}

export function useWeatherGeo() {
  const [location, setLocation] = useState(null);
  const [liveCity, setLiveCity] = useState(null);
  const [liveTemp, setLiveTemp] = useState(null);

  const cachedRaw = useSyncExternalStore(
    subscribeToStorage,
    getStoredWeatherSnapshot,
    getEmptyServerSnapshot
  );

  let cachedParsed = null;
  if (cachedRaw) {
    try {
      cachedParsed = JSON.parse(cachedRaw);
    } catch {
      cachedParsed = null;
    }
  }

  const city = liveCity || cachedParsed?.city || null;
  const temp = liveTemp || cachedParsed?.temp || null;
  const isHydrated = cachedRaw !== null || liveCity !== null || liveTemp !== null;

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === 1 || error.code === 2 || error.code === 3) {
          setLocation({
            lat: DEFAULT_LAT,
            lon: DEFAULT_LON,
          });
        }
      },
      { timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const roundedLat = Number(location.lat).toFixed(2);
    const roundedLon = Number(location.lon).toFixed(2);

    const fetchGeoData = async () => {
      try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const isFresh = Date.now() - parsed.timestamp < CACHE_TTL;
          const isSameArea =
            parsed.lat === roundedLat && parsed.lon === roundedLon;

          if (isFresh && isSameArea && parsed.temp && parsed.city) {
            setLiveCity(parsed.city);
            setLiveTemp(parsed.temp);
            return;
          }
        }

        const [locationResponse, weatherResponse] = await Promise.allSettled([
          fetch(`/api/location?lat=${roundedLat}&lon=${roundedLon}`),
          fetch(`/api/weather?lat=${roundedLat}&lon=${roundedLon}`),
        ]);

        let fetchedCity = null;
        let fetchedTemp = null;

        if (
          locationResponse.status === "fulfilled" &&
          locationResponse.value.ok
        ) {
          const locationJson = await locationResponse.value.json();
          const rawCity =
            locationJson.address?.city ||
            locationJson.address?.town ||
            locationJson.address?.city_district ||
            locationJson.address?.municipality ||
            locationJson.address?.village ||
            locationJson.address?.state ||
            "Jakarta";
          fetchedCity = formatCityDisplay(rawCity);
          setLiveCity(fetchedCity);
        }

        if (weatherResponse.status === "fulfilled" && weatherResponse.value.ok) {
          const weatherJson = await weatherResponse.value.json();
          if (weatherJson.current?.temp !== undefined) {
            fetchedTemp = {
              temp: Math.round(weatherJson.current.temp),
              weather: weatherJson.current.weather?.[0]?.main || "Clear",
            };
            setLiveTemp(fetchedTemp);
          }
        }

        if (fetchedCity || fetchedTemp) {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              lat: roundedLat,
              lon: roundedLon,
              city: fetchedCity,
              temp: fetchedTemp,
              timestamp: Date.now(),
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGeoData();
  }, [location]);

  return { city, temp, location, isMounted: isHydrated };
}
