import './App.css';
import DiaryToWrite from './Pages/DiaryToWrite';
import DiaryList from './Pages/DiaryList';
import WeatherDisplay from './Pages/WeatherDisplay';
import React, { useState } from 'react';

function App() {
  const [weather, setWeather] = useState({});
  const [state, setState] = useState([]);

  return (
    <div className='App'>
      <h2>색깔 일기장</h2>
      <WeatherDisplay setWeather={setWeather} weather={weather} />
      <DiaryToWrite state={state} setState={setState} />
      <DiaryList state={state} setState={setState} />
    </div>
  );
}

export default App;
