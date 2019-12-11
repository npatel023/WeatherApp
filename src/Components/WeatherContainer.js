import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';

/**
 *
 * @param {string} query
 */
const createAPIUrl = query =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

const zipRegx = /[0-9]{5}/;

/**
 *
 * @param {string} zipCode
 */
const validateZipCode = zipCode => zipRegx.test(zipCode);

/**
 *
 * @param {number} temp
 */
const convertToFarenheit = temp =>
  ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);

function WeatherContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null
  });
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  function updateSearchQuery({ target: { value } }) {
    setSearchQuery(value);
    setIsValidZipCode(value === '' || validateZipCode(value));
  }

  async function getWeatherData() {
    if (!isValidZipCode || searchQuery === '') {
      setIsValidZipCode(false);
      return;
    }

    const response = await fetch(createAPIUrl(searchQuery));

    if (!response.ok) {
      return;
    }

    const { main, weather, name } = await response.json();

    setWeatherData({
      temp: convertToFarenheit(main.temp),
      humidity: main.humidity,
      desc: weather[0].main,
      city: name
    });
  }

  return (
    <section className="weather-container">
      <header className="weather-header">
        <h3>Weather</h3>
        <div>
          <input
            placeholder="Zip Code"
            className="search-input"
            onChange={updateSearchQuery}
            maxLength="5"
            type="number"
          />
          <button
            onClick={getWeatherData}
            type="button"
            className="material-icons"
          >
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidZipCode ? '' : 'Invalid Zip Code'}</p>
      <section className="weather-info">
        {weatherData.temp ? (
          <WeatherInfo data={weatherData} />
        ) : (
          <p>
            No Weather to Display<i className="material-icons">wb_sunny</i>
          </p>
        )}
      </section>
    </section>
  );
}

export default WeatherContainer;
