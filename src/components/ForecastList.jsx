import ForecastCard from "./ForecastCard";

function ForecastList({ forecast }) {
  return (
    <section className="forecast-section">
      <h2>5-Day Forecast</h2>

      <div className="forecast-list">
        {forecast.map((day) => (
          <ForecastCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  );
}

export default ForecastList;