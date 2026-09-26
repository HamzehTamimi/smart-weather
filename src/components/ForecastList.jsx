import ForecastCard from "./ForecastCard";

function ForecastList({ forecast }) {
  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <p className="label-large">FORECAST</p>
          <h2>Next 5 days</h2>
        </div>

        <mdui-chip variant="assist">5 days</mdui-chip>
      </div>

      <div className="forecast-list">
        {forecast.map((day) => (
          <ForecastCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  );
}

export default ForecastList;