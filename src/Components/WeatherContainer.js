import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';

const createAPIUrl = query =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

function WeatherContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null
  });
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  function updateSearchQuery(event) {
    let zipCode = event.target.value;
    let isValid = validateZipCode(zipCode);
    setSearchQuery(zipCode);

    if (isValid || zipCode === '' || isValid.length === 5) {
      setIsValidZipCode(true);
    } else {
      setIsValidZipCode(false);
    }
  }

  function validateZipCode(zipCode) {
    let regex = /[0-9]{5}/;
    return regex.test(zipCode);
  }

  function getWeatherData() {
    if (!isValidZipCode || searchQuery === '') {
      setIsValidZipCode(false);
      return;
    }
    fetch(createAPIUrl(searchQuery))
      .then(response => response.json())
      .then(data =>
        setWeatherData({
          temp: convertToFarenheit(data.main.temp),
          humidity: data.main.humidity,
          desc: data.weather[0].main,
          city: data.name
        })
      );
  }

  function convertToFarenheit(temp) {
    return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
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
          />
          <button onClick={getWeatherData} className="material-icons">
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidZipCode ? '' : 'Invalid Zip Code'}</p>
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No Weather to Display<i className="material-icons">wb_sunny</i>
          </p>
        ) : (
          <WeatherInfo data={weatherData} />
        )}
      </section>
    </section>
  );
}

export default WeatherContainer;
