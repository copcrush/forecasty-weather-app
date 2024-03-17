import React, { useState } from "react";
import "./SearchContainer.css";

const SearchContainer = ({
  query,
  setQuery,
  search,
  fetchCurrentLocationWeather,
  handleFamousCityClick,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCurrentLocationClick = () => {
    fetchCurrentLocationWeather();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <div className="search-container">
      <div className="search-first-row">
        <div className="search-logo">
          <div className="logo">
            <a href="/">
              <img src="icons/forecastylogo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className="search-current-response">
          <div className="search-bar-box">
            <input
              type="text"
              placeholder="Search for Location"
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </div>
          <div className="current-location">
            <button
              className="current-location-btn"
              onClick={handleCurrentLocationClick}
            >
              <img
                alt="current"
                src="icons/currentlocation.png"
                className="current-location-images"
              />
            </button>
          </div>
        </div>
        <div className="mini-container">
          <div className="light-dark-container">
            <label className="switch">
              <input type="checkbox" id="toggle" onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="github-box">
            <a href="https://github.com/copcrush/react-app-forecasty.git">
              <img alt="git" src="icons/github.png" className="github-images" />
            </a>
          </div>
        </div>
      </div>

      <div className="search-second-row">
        <div className="famous-city">
          <div className="famous-first">
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Bangkok")}
              >
                Bangkok
              </button>
            </div>
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Chiang Mai")}
              >
                Chiang Mai
              </button>
            </div>
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Khon Kaen")}
              >
                Khon Kaen
              </button>
            </div>
          </div>
          <div className="famous-second">
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Pattaya")}
              >
                Pattaya
              </button>
            </div>
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Hua Hin")}
              >
                Hua Hin
              </button>
            </div>
            <div className="famous-city-list">
              <button
                className="famous-city-btn"
                onClick={() => handleFamousCityClick("Phuket")}
              >
                Phuket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
