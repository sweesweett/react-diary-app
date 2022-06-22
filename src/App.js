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
  return (
    <div className='App'>
      <h2 className='title'>색깔 일기장</h2>
      <WeatherDisplay setWeather={setWeather} weather={weather} />
      <DiaryToWrite state={state} setState={setState} weather={weather} />
      <DiaryList state={state} setState={setState} />
    </div>
  );
}

export default App;
