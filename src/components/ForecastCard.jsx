function ForecastCard({ forecast }) {
  const date = new Date(`${forecast.date}T00:00:00`);

  const dayName = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <article className="forecast-card">
      <p className="forecast-day">{dayName}</p>

      <span className="forecast-icon" aria-hidden="true">
        {forecast.icon}
      </span>

      <p className="forecast-condition">{forecast.condition}</p>

      <div className="forecast-temperatures">
        <strong>{Math.round(forecast.maxTemp)}°</strong>
        <span>{Math.round(forecast.minTemp)}°</span>
      </div>

      <p className="rain-chance">
        Rain: {forecast.rainChance ?? 0}%
      </p>
    </article>
  );
}

export default ForecastCard;