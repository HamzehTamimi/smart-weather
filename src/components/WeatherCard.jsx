function WeatherCard({ weather }) {
  return (
    <section className="weather-container">
      <div className="weather-heading">
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p className="condition">{weather.condition}</p>
        </div>

        <span className="weather-icon" aria-hidden="true">
          {weather.icon}
        </span>
      </div>

      <p className="temperature">{Math.round(weather.temperature)}°C</p>

      <div className="weather-details">
        <div>
          <span>Feels like</span>
          <strong>{Math.round(weather.feelsLike)}°C</strong>
        </div>

        <div>
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>

        <div>
          <span>Precipitation</span>
          <strong>{weather.precipitation} mm</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;