function ThermometerIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0Zm-3 7a3 3 0 0 1-1.5-5.6l.5-.29V5a1 1 0 0 1 2 0v9.11l.5.29A3 3 0 0 1 12 20Z" />
      </svg>
    </mdui-icon>
  );
}

function HumidityIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M12 2S5 9.4 5 14a7 7 0 0 0 14 0c0-4.6-7-12-7-12Zm0 18a5 5 0 0 1-5-5c0-2.7 3.3-7.2 5-9.3 1.7 2.1 5 6.6 5 9.3a5 5 0 0 1-5 5Z" />
      </svg>
    </mdui-icon>
  );
}

function WindIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M4 8h10a2 2 0 1 0-2-2h-2a4 4 0 1 1 4 4H4V8Zm0 4h15a3 3 0 1 1-3 3h2a1 1 0 1 0 1-1H4v-2Zm0 4h7a3 3 0 1 1-3 3H6a1 1 0 1 0 1-1H4v-2Z" />
      </svg>
    </mdui-icon>
  );
}

function RainIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M17.5 10a5.5 5.5 0 0 0-10.42-2.48A4.5 4.5 0 0 0 7.5 16H18a3.5 3.5 0 0 0-.5-6Zm.5 4H7.5a2.5 2.5 0 0 1-.08-5 2.5 2.5 0 0 1 .94.18A3.5 3.5 0 0 1 15.5 10v1.5H18a1.5 1.5 0 0 1 0 3ZM8 18h2v4H8v-4Zm6 0h2v4h-2v-4Z" />
      </svg>
    </mdui-icon>
  );
}

function WeatherCard({ weather }) {
  return (
    <mdui-card class="weather-card" variant="filled">
      <div className="weather-header">
        <div>
          <p className="label-large">CURRENT WEATHER</p>

          <h2>
            {weather.city}
            <span>{weather.country}</span>
          </h2>

          <p className="condition">{weather.condition}</p>
        </div>

        <div className="temperature-area">
          <span className="weather-symbol" aria-hidden="true">
            {weather.icon}
          </span>

          <p className="temperature">
            {Math.round(weather.temperature)}
            <span>°</span>
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="metric">
          <ThermometerIcon />

          <div>
            <span>Feels like</span>
            <strong>{Math.round(weather.feelsLike)}°C</strong>
          </div>
        </div>

        <div className="metric">
          <HumidityIcon />

          <div>
            <span>Humidity</span>
            <strong>{weather.humidity}%</strong>
          </div>
        </div>

        <div className="metric">
          <WindIcon />

          <div>
            <span>Wind</span>
            <strong>{weather.windSpeed} km/h</strong>
          </div>
        </div>

        <div className="metric">
          <RainIcon />

          <div>
            <span>Precipitation</span>
            <strong>{weather.precipitation} mm</strong>
          </div>
        </div>
      </div>
    </mdui-card>
  );
}

export default WeatherCard;