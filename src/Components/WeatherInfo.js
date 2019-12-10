import React from "react";
// import "../Styles/Weather.css";

function WeatherInfo(props) {
  const { temp, humidity, city, desc } = props.data;
  return (
    <React.Fragment>
      <h3>{desc}</h3>
      <section className="weather-data-flex">
        <div className="header-description">
          <h4>City</h4>
          <p>{city}</p>
        </div>
        <div className="header-description">
          <h4>Temperature</h4>
          <p>
            {temp}
            <span className="degree-symbol"></span> F
          </p>
        </div>
        <div className="header-description">
          <h4>Humidity</h4>
          <p>{humidity}%</p>
        </div>
      </section>
    </React.Fragment>
  );
}

export default WeatherInfo;
