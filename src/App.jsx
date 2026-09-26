import { useState } from "react";
import { getWeather } from "./services/weatherApi";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "./App.css";

function SearchIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M9.5 3a6.5 6.5 0 1 0 3.98 11.64L19.85 21 21 19.85l-6.36-6.37A6.5 6.5 0 0 0 9.5 3Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
      </svg>
    </mdui-icon>
  );
}

function CloudIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 5.5 8 6 6 0 0 0 6 20h13a5 5 0 0 0 .35-9.96ZM19 18H6a4 4 0 0 1-.14-8 2 2 0 0 1 1.22.32A5.5 5.5 0 0 1 17.5 12v.1A3 3 0 0 1 19 18Z" />
      </svg>
    </mdui-icon>
  );
}

function ExploreIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm3.5 4.5-5.2 1.8-1.8 5.2 5.2-1.8 1.8-5.2Zm-3.1 3.1 1-.35-.35 1-1 .35.35-1Z" />
      </svg>
    </mdui-icon>
  );
}

function ErrorIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M12 2 1 21h22L12 2Zm0 4 7.53 13H4.47L12 6Zm-1 4v5h2v-5h-2Zm0 7v2h2v-2h-2Z" />
      </svg>
    </mdui-icon>
  );
}

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
      <div className="dashboard">
        <header className="top-bar">
          <div className="brand">
            <div className="brand-icon">
              <CloudIcon />
            </div>

            <div>
              <h1>Smart Weather</h1>
              <p>Weather with intelligent insights</p>
            </div>
          </div>

          <mdui-chip variant="assist">Live weather</mdui-chip>
        </header>

        <section className="hero">
          <p className="label-large">SMART FORECAST</p>

          <h2>Weather, made useful.</h2>

          <p className="hero-description">
            Search any city to explore current conditions and the upcoming
            forecast.
          </p>

          <form className="search-form" onSubmit={handleSubmit}>
            <mdui-text-field
              class="city-input"
              variant="outlined"
              label="Search for a city"
              placeholder="Amman, London, Tokyo..."
              value={city}
              onInput={(event) => setCity(event.target.value)}
              clearable
            >
              <span slot="icon">
                <SearchIcon />
              </span>
            </mdui-text-field>

            <mdui-button
              class="search-button"
              variant="filled"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <mdui-circular-progress
                    slot="start"
                    class="button-progress"
                  ></mdui-circular-progress>
                  Searching
                </>
              ) : (
                <>
                  <span slot="start">
                    <SearchIcon />
                  </span>
                  Search
                </>
              )}
            </mdui-button>
          </form>
        </section>

        {error && (
          <div className="error-container">
            <ErrorIcon />

            <div>
              <strong>Couldn't load weather</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {weather ? (
          <div className="weather-content">
            <WeatherCard weather={weather} />
            <ForecastList forecast={weather.forecast} />
          </div>
        ) : (
          !error &&
          !loading && (
            <mdui-card class="empty-state" variant="filled">
              <div className="empty-icon">
                <ExploreIcon />
              </div>

              <h2>Explore the weather</h2>

              <p>
                Search for a city above to see current conditions and a
                five-day forecast.
              </p>
            </mdui-card>
          )
        )}
      </div>
    </main>
  );
}

export default App;