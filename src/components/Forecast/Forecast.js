import React, { useState } from "react";
import "./Forecast.css";

const Forecast = ({ forecast }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredDates = forecast.list
    .filter((data) => !data.dt_txt.includes("00:00:00"))
    .filter((data) => data.dt_txt.split(" ")[0] !== currentDate)
    .filter(
      (data, index, self) =>
        self.findIndex(
          (d) => d.dt_txt.split(" ")[0] === data.dt_txt.split(" ")[0]
        ) === index
    )
    .slice(0, 5);

  return (
    <div className="forecast-container">
      <p className="hourly-forecast-title">Hourly Forecast</p>
      <div className="hourly-container">
        <div className="hourly">
          {forecast.list.slice(0, 8).map((hourlyData, index) => (
            <div className="hourly-forecast-card" key={index}>
              <div className="hourly-time">
                {hourlyData.dt_txt.split(" ")[1].substring(0, 5)}
              </div>{" "}
              <div className="hourly-icons">
                <img
                  alt="icons"
                  src={`icons/${hourlyData.weather[0].icon}.png`}
                  className="hourly-icons-images"
                />
              </div>
              <div className="hourly-temp">
                {Math.round(hourlyData.main.temp)}°C
              </div>
              <div className="hourly-description">
                {hourlyData.weather[0].main}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="daily-forecast-title">
        <p className="daily-title">Daily Forecast 5 Days</p>
        <select
          className="forecast-date-dropdown"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option className="forecast-select-date">Select Date</option>
          {filteredDates.map((data) => (
            <option className="forecast-select-date" key={data.dt_txt}>
              {data.dt_txt.split(" ")[0]}
            </option>
          ))}
        </select>
      </div>

      <div className="daily-container">
        <div className="daily">
          {selectedDate &&
            forecast.list
              .filter((data) => data.dt_txt.includes(selectedDate))
              .map((dailyData, index) => (
                <div className="daily-forecast-card" key={index}>
                  <div className="daily-time">
                    {dailyData.dt_txt.split(" ")[1].substring(0, 5)}
                  </div>{" "}
                  <div className="daily-icons">
                    <img
                      alt="icons"
                      src={`icons/${dailyData.weather[0].icon}.png`}
                      className="daily-icons-images"
                    />
                  </div>
                  <div className="daily-temp">
                    {Math.round(dailyData.main.temp)}°C
                  </div>
                  <div className="daily-description">
                    {dailyData.weather[0].main}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
