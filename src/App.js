import './App.css';
import DiaryToWrite from './Components/DiaryToWrite';
import DiaryList from './Components/DiaryList';
import WeatherDisplay from './Components/WeatherDisplay';
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
      'http://api.openweathermap.org/data/2.5/weather?id=1835848&lang=kr&appid='
    )
      .then((res) => res.json())
      .then((data) => ({
        desc: data.weather[0].description,
        humidity: data.main.humidity,
        temp: Math.round(data.main.temp - 273),
        temp_min: Math.round(data.main.temp_min - 273),
        temp_max: Math.round(data.main.temp_max - 273),
        wind: data.wind.speed,
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

  const diarySubmit = () => {
    if (title.current.value === '' || content.current.value === '') {
      alert('일기를 작성해주세요');
      return;
    }
    let origin_id = uuid();
    const createdTime = new Date().toLocaleString();
    localStorage.setItem(
      'diaryList',
      JSON.stringify([
        {
          origin_id,
          [title.current.name]: title.current.value,
          [content.current.name]: content.current.value,
          [color.current.name]: color.current.value,
          createdTime,
        },
        ...state,
      ])
    );
    setState([
      {
        origin_id,
        [title.current.name]: title.current.value,
        [content.current.name]: content.current.value,
        [color.current.name]: color.current.value,
        createdTime,
      },
      ...state,
    ]);
    title.current.value = '';
    content.current.value = '';
    color.current.value = '';
  };

  return (
    <div className='App'>
      <h2 className='title'>색깔 일기장</h2>
      <WeatherDisplay weather={weather} />
      <DiaryToWrite state={state} setState={setState} weather={weather} />
      <DiaryList state={state} setState={setState} />
    </div>
  );
}

export default App;
