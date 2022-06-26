import './App.css';
import DiaryToWrite from './Components/DiaryToWrite';
import DiaryList from './Components/DiaryList';
import WeatherDisplay from './Components/WeatherDisplay';
import uuid from 'react-uuid';
import React, { useEffect, useState } from 'react';
import dummy from './Resource/dummy';

function App() {
  let initialState = JSON.parse(localStorage.getItem('diaryList'));
  if (initialState === null) {
    initialState = [];
  }
  const [weather, setWeather] = useState({});
  const [state, setState] = useState(initialState);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=1835848&lang=kr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
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
      })
      .catch((error) =>
        setWeather({
          // 날씨 api 작동 안될시
          desc: dummy.weather[0].description,
          humidity: dummy.main.humidity,
          temp: Math.round(dummy.main.temp - 273),
          temp_min: Math.round(dummy.main.temp_min - 273),
          temp_max: Math.round(dummy.main.temp_max - 273),
          wind: dummy.wind.speed,
          icon: dummy.weather[0].icon,
        })
      );
  }, []);
  //다이어리 저장
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
  //다이어리 삭제
  const diaryDelete = (index) => {
    state.splice(index, 1);
    localStorage.setItem('diaryList', JSON.stringify([...state]));
    setState([...state]);
  };
  //다이어리 수정
  const diaryEdit = (el, title, content) => {
    el['title'] = title;
    el['content'] = content;
    setState([...state]);
    localStorage.setItem('diaryList', JSON.stringify([...state]));
  };

  return (
    <div className='App'>
      <h2 className='title'>색깔 일기장</h2>
      <WeatherDisplay weather={weather} />
      <DiaryToWrite diarySubmit={diarySubmit} />
      <DiaryList
        state={state}
        diaryDelete={diaryDelete}
        diaryEdit={diaryEdit}
      />
    </div>
  );
}

export default App;
