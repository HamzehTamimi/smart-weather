function DropIcon() {
  return (
    <mdui-icon>
      <svg viewBox="0 0 24 24">
        <path d="M12 2S5 9.4 5 14a7 7 0 0 0 14 0c0-4.6-7-12-7-12Zm0 18a5 5 0 0 1-5-5c0-2.7 3.3-7.2 5-9.3 1.7 2.1 5 6.6 5 9.3a5 5 0 0 1-5 5Z" />
      </svg>
    </mdui-icon>
  );
}

function ForecastCard({ forecast }) {
  const date = new Date(`${forecast.date}T00:00:00`);

  const dayName = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const dateLabel = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <mdui-card class="forecast-card" variant="filled">
      <div className="forecast-date">
        <strong>{dayName}</strong>
        <span>{dateLabel}</span>
      </div>

      <span className="forecast-icon" aria-hidden="true">
        {forecast.icon}
      </span>

      <p className="forecast-condition">{forecast.condition}</p>

      <div className="forecast-temperatures">
        <strong>{Math.round(forecast.maxTemp)}°</strong>
        <span>{Math.round(forecast.minTemp)}°</span>
      </div>

      <div className="rain-chance">
        <DropIcon />
        <span>{forecast.rainChance ?? 0}%</span>
      </div>
    </mdui-card>
  );
}

export default ForecastCard;