import './App.css';
import DiaryToWrite from './Components/DiaryToWrite';
import DiaryList from './Components/DiaryList';
import WeatherDisplay from './Components/WeatherDisplay';
import uuid from 'react-uuid';
import React, { useEffect, useState } from 'react';

function App() {
  let initialState = JSON.parse(localStorage.getItem('diaryList'));
  if (initialState === null) {
    initialState = [];
  }
  const [weather, setWeather] = useState({});
  const [state, setState] = useState(initialState);
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=1835848&lang=kr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => ({
        desc: data.weather[0].description,
        humidity: data.main.humidity,
        temp: Math.round(data.main.temp - 273),
        temp_min: Math.round(data.main.temp_min - 273),
        temp_max: Math.round(data.main.temp_max - 273),
        wind: data.wind.speed,
        icon: data.weather[0].icon,
      }))
      .then((obj) => {
        console.log(obj);
        setWeather(obj);
      });
    // setWeather({
    //   desc: dummy.weather[0].description,
    //   humidity: dummy.main.humidity,
    //   temp: Math.round(dummy.main.temp - 273),
    //   temp_min: Math.round(dummy.main.temp_min - 273),
    //   temp_max: Math.round(dummy.main.temp_max - 273),
    //   wind: dummy.wind.speed,
    // });
  }, []);

  const diarySubmit = (title, content, color) => {
    let origin_id = uuid();
    const createdTime = new Date().toLocaleString();
    const icon = weather.icon;
    console.log(icon);
    localStorage.setItem(
      'diaryList',
      JSON.stringify([
        {
          origin_id,
          title,
          content,
          color,
          createdTime,
          icon,
        },
        ...state,
      ])
    );
    setState([
      {
        origin_id,
        title,
        content,
        color,
        createdTime,
        icon: weather.icon,
      },
      ...state,
    ]);
    console.log(state);
  };

  return (
    <div className='App'>
      <h2 className='title'>색깔 일기장</h2>
      <WeatherDisplay weather={weather} />
      <DiaryToWrite diarySubmit={diarySubmit} />
      <DiaryList state={state} setState={setState} />
    </div>
  );
}

export default App;
