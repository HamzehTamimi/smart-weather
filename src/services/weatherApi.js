const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

async function getCoordinates(city) {
  const response = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1`
  );

  if (!response.ok) {
    throw new Error("Could not search for this city");
  }

  const data = await response.json();

  // Open-Meteo returns an empty results list when the city can't be found.
  if (!data.results?.length) {
    throw new Error("City not found");
  }

  return data.results[0];
}

export async function getWeather(city) {
  // Weather requests need coordinates, so find the city first.
  const location = await getCoordinates(city);

  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,apparent_temperature,wind_speed_10m",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Could not load weather data");
  }

  const data = await response.json();

  return {
    city: location.name,
    country: location.country,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    windSpeed: data.current.wind_speed_10m,
  };
}