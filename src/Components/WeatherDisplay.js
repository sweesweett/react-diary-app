import React from 'react';
// import dummy from '../Resource/dummy';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weather }) => {
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
