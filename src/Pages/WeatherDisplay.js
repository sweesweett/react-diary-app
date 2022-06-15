import { useEffect } from 'react';
import dummy from '../Resource/dummy';
import './WeatherDisplay.css';

const WeatherDisplay = ({ setWeather, weather }) => {
  useEffect(() => {
    // fetch(
    //   'http://api.openweathermap.org/data/2.5/weather?id=1835848&lang=kr&appid=f413fbd15cf93aa84ef1964715d0baed'
    // )
    //   .then((res) => res.json())
    //   .then((data) => ({
    //     desc: data.weather[0].description,
    //     humidity: data.main.humidity,
    //     temp: Math.round(data.main.temp - 273),
    //     temp_min: Math.round(data.main.temp_min - 273),
    //     temp_max: Math.round(data.main.temp_max - 273),
    //     wind: data.wind.speed,
    //   }))
    //   .then((obj) => setWeather(obj));
    setWeather({
      desc: dummy.weather[0].description,
      humidity: dummy.main.humidity,
      temp: Math.round(dummy.main.temp - 273),
      temp_min: Math.round(dummy.main.temp_min - 273),
      temp_max: Math.round(dummy.main.temp_max - 273),
      wind: dummy.wind.speed,
    });
  }, []);

  return (
    <section className='weatherDisplay'>
      <div className='weatherLeft'>
        <div className='currentTemp'>
          <div className='emoji'>이모지</div>
          <div className='temp'>
            <span>{weather.desc}</span>
            <div>{weather.temp}℃</div>
          </div>
        </div>
        <div className='minMaxTemp'>
          {/* //flex row*/}
          <div>{weather.temp_min}℃</div>
          <div>{weather.temp_max}℃</div>
        </div>
      </div>
      <div className='weatherRight'>
        {/* //flex column */}
        <div>{weather.wind}m/s</div>
        <div>{weather.humidity}%</div>
      </div>
    </section>
  );
};

export default WeatherDisplay;
