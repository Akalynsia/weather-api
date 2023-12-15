"use client";
import React, { useRef, useState } from "react";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const locationRef = useRef(null);

  const fetchWeatherData = async () => {
    const location = locationRef.current.value;

    try {
      const apiKey = "9d9013e41f705d5bf661f59038aaf09f"; // Replace with your actual API key
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

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" ref={locationRef} placeholder="Enter location" />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>Weather Information for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
