const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

function getWeatherCondition(code) {
  // Open-Meteo uses WMO weather codes instead of condition names.
  const conditions = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌦️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "❄️" },
    75: { label: "Heavy snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Rain showers", icon: "🌧️" },
    82: { label: "Heavy showers", icon: "⛈️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
  };

  return conditions[code] || { label: "Unknown", icon: "🌡️" };
}

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
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Could not load weather data");
  }

  const data = await response.json();
  const condition = getWeatherCondition(data.current.weather_code);

  return {
    city: location.name,
    country: location.country,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    precipitation: data.current.precipitation,
    windSpeed: data.current.wind_speed_10m,
    condition: condition.label,
    icon: condition.icon,
  };
}