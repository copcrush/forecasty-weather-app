import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ weather, currentDate }) => {
  const convertUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="weather-container">
      <div className="weather-first-col">
        {currentDate && <div className="date">{currentDate}</div>}
        <div className="location">
          {weather.name}, {weather.sys.country}
        </div>
        <div className="weather-icons">
          <img src={`icons/${weather.weather[0].icon}.png`} alt="icons" />
        </div>
        <div className="temperature">{Math.round(weather.main.temp)}°C</div>
        <div className="weather">{weather.weather[0].main}</div>
        <div className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}°C
        </div>
        <div className="min-max">
          <label>H:{Math.round(weather.main.temp_max)}° </label>
          <label>L:{Math.round(weather.main.temp_min)}°</label>
        </div>
      </div>

      <div className="weather-second-col">
        <div className="weather-details-header">Weather Detail</div>
        <div className="sunrise-sunset">
          <div className="sunrise-container">
            <div className="sunrise">
              <img
                alt="sunrise"
                src="icons/sunrise.png"
                className="sunrise-images"
              />
            </div>
            <div className="sunrise-details">
              <p className="sunrise-header">Sunrise</p>
              <p className="sunrise-time">
                {convertUnixTimestamp(weather.sys.sunrise)}
              </p>
            </div>
          </div>
          <div className="sunset-container">
            <div className="sunset">
              <img
                alt="sunset"
                src="icons/sunset.png"
                className="sunset-images"
              />
            </div>
            <div className="sunset-details">
              <p className="sunset-header">Sunset</p>
              <p className="sunset-time">
                {convertUnixTimestamp(weather.sys.sunset)}
              </p>
            </div>
          </div>
        </div>
        <div className="weather-details-container">
          <div className="humidity-container">
            <div className="humidity">
              <img
                alt="humid"
                src="icons/humidity.png"
                className="humidity-images"
              />
            </div>
            <p className="humidity-header">Humidity</p>
            <p className="humidity-value">{weather.main.humidity}%</p>
          </div>
          <div className="wind-container">
            <div className="wind">
              <img alt="wind" src="icons/wind.png" className="wind-images" />
            </div>
            <p className="wind-header">Wind Speed</p>
            <p className="wind-value">{Math.round(weather.wind.speed)} km/hr</p>
          </div>
          <div className="pressure-container">
            <div className="pressure">
              <img
                alt="pressure"
                src="icons/pressure.png"
                className="pressure-images"
              />
            </div>
            <p className="pressure-header">Pressure</p>
            <p className="pressure-value">{weather.main.pressure} kPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
