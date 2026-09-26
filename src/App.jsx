import { useState } from "react";
import { getWeather } from "./services/weatherApi";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchCity = city.trim();

    if (!searchCity) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const weatherData = await getWeather(searchCity);
      setWeather(weatherData);
      setCity("");
    } catch (err) {
      // Keep API errors user-friendly instead of exposing request details.
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>Smart Weather</h1>
        <p>Weather forecasts with AI-powered insights.</p>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        !error && (
          <section className="weather-container">
            <p>Search for a city to get started.</p>
          </section>
        )
      )}
    </main>
  );
}

export default App;