import { useEffect } from 'react';
import dummy from '../Resource/dummy';
import './WeatherDisplay.css';

const WeatherDisplay = ({ setWeather, weather }) => {
  useEffect(() => {
    // fetch(
    //   'http://api.openweathermap.org/data/2.5/weather?id=1835848&lang=kr&appid='
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
          <div className='emoji'></div>
          <div className='temp'>
            <span>{weather.desc}</span>
            <div className='nowTemp'>{weather.temp}℃</div>
          </div>
        </div>
        <div className='minMaxTemp'>
          {/* //flex row*/}
          <div>
            최고 <span className='Emp'>{weather.temp_min}℃</span>
          </div>
          <div>
            최저 <span className='Emp'>{weather.temp_max}℃</span>
          </div>
        </div>
      </div>
      <div className='weatherRight'>
        {/* //flex column */}
        <div>
          바람속도<span className='Emp'>{weather.wind}m/s</span>
        </div>
        <div>
          습도 <span className='Emp'>{weather.humidity}%</span>
        </div>
      </div>
    </section>
  );
};

export default WeatherDisplay;
