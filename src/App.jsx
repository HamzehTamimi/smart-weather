import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }

    setSearchedCity(city.trim());
    setCity("");
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

        <button type="submit">Search</button>
      </form>

      <section className="weather-container">
        {searchedCity ? (
          <p>
            Showing weather for <strong>{searchedCity}</strong>
          </p>
        ) : (
          <p>Search for a city to get started.</p>
        )}
      </section>
    </main>
  );
}

export default App;