"use client";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faSmog,
  faThermometerHalf,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import "./globals.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const locationRef = useRef(null);

  const fetchWeatherData = async () => {
    const location = locationRef.current.value;

    try {
      const apiKey = "9d9013e41f705d5bf661f59038aaf09f";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Weather data not available for this location");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} />;
      case "Clouds":
        return <FontAwesomeIcon icon={faCloud} />;
      case "Drizzle":
      case "Rain":
        return <FontAwesomeIcon icon={faCloudRain} />;
      case "Snow":
        return <FontAwesomeIcon icon={faSnowflake} />;
      case "Mist":
      case "Smoke":
      case "Haze":
        return <FontAwesomeIcon icon={faSmog} />;
      default:
        return <FontAwesomeIcon icon={faCloudSun} />;
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input type="text" ref={locationRef} placeholder="Enter location" />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div className="weather-info">
          <h2>Weather Information for {weatherData.name}</h2>
          <div>
            <p>
              {getWeatherIcon(weatherData.weather[0].main)}{" "}
              {weatherData.weather[0].description}
            </p>
            <p>
              <FontAwesomeIcon icon={faThermometerHalf} /> Temperature:{" "}
              {weatherData.main.temp}°C
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faTint} />
              Humidity: {weatherData.main.humidity}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
