import React, { useState } from "react";
import Card from "./Card";
import Form from './Form';

const WeatherPanel = ()  => {

  let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=3a5f2f1d2e8312f63c338b76a4d2a947&lang=es";
  let cityUrl = "&q=";

  let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=3a5f2f1d2e8312f63c338b76a4d2a947&lang=es";

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async(loc) => {
    setLoading(true);
    setLocation(loc);

    //weather
    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather).then((response) => {
      if(!response.ok) throw {response}
      return response.json();      
    }).then((weatherData) => {
      console.log(weatherData);
      setWeather(weatherData);
    }).catch(error => {
      console.log(error);
      setLoading(false);
      setShow(false);
    });

    //forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast).then((response) => {
      if(!response.ok) throw {response}
      return response.json();      
    }).then((forecastData) => {
      console.log(forecastData);
      setForecast(forecastData);

      setLoading(false);
      setShow(true);

    }).catch(error => {
      console.log(error);
      setLoading(false);
      setShow(false);
    });


  }

  return (
    <React.Fragment>

      <Form 
        newLocation = {getLocation}
      />
      <Card 
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>

  );
}

export default WeatherPanel;