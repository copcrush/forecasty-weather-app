import React, { useState, useEffect } from "react";
import "./App.css";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Footer from "./components/Footer/Footer";
import Forecast from "./components/Forecast/Forecast";
import key from "./key";

const api = {
  key: key.apiKey,
  base: key.baseUrl,
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    fetchCurrentLocationWeather();
    setCurrentDate(formatDate(new Date()));
  }, []);

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(
          `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`
        )
          .then((res) => res.json())
          .then((weatherData) => {
            setWeather(weatherData);

            fetch(
              `${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`
            )
              .then((res) => res.json())
              .then((forecastData) => {
                setForecast(forecastData);
                console.log("Forecast data:", forecastData);
              })
              .catch((error) => {
                console.error("Error fetching forecast data:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((weatherData) => {
          if (weatherData.cod === 200) {
            setQuery("");
            setWeather(weatherData);

            fetch(
              `${api.base}forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${api.key}`
            )
              .then((res) => res.json())
              .then((forecastData) => {
                setForecast(forecastData);
                console.log("Forecast data:", forecastData);
              })
              .catch((error) => {
                console.error("Error fetching forecast data:", error);
              });
          } else {
            console.error("Error fetching weather data:", weatherData.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  const handleFamousCityClick = (cityName) => {
    fetch(`${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((weatherData) => {
        setWeather(weatherData);

        fetch(
          `${api.base}forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${api.key}`
        )
          .then((res) => res.json())
          .then((forecastData) => {
            setForecast(forecastData);
            console.log("Forecast data:", forecastData);
          })
          .catch((error) => {
            console.error("Error fetching forecast data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="App">
      <SearchContainer
        query={query}
        setQuery={setQuery}
        search={search}
        handleFamousCityClick={handleFamousCityClick}
        fetchCurrentLocationWeather={fetchCurrentLocationWeather}
      />
      {weather && (
        <CurrentWeather weather={weather} currentDate={currentDate} />
      )}
      {forecast && <Forecast forecast={forecast} />}
      <Footer />
    </div>
  );
}

export default App;
