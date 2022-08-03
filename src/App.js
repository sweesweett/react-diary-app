import './App.css';
import DiaryToWrite from './Components/DiaryToWrite';
import DiaryList from './Components/DiaryList';
import WeatherDisplay from './Components/WeatherDisplay';
import Modal from './Components/Modal';
import DetailDiary from './Components/DetailDiary';
import EditDiary from './Pages/EditDiary';
import uuid from 'react-uuid';
import React, { useEffect, useState } from 'react';
import dummy from './Resource/dummy';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  let initialState = JSON.parse(localStorage.getItem('diaryList'));
  if (initialState === null) {
    initialState = [];
  }
  const navigate = useNavigate();
  const [weather, setWeather] = useState({});
  const [state, setState] = useState(initialState);
  const [modalContent, setModalContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
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
        icon,
      },
      ...state,
    ]);

    navigate('/');
  };
  //다이어리 삭제
  const diaryDelete = (index) => {
    let newState = state.filter((el) => el.origin_id !== index);
    localStorage.setItem('diaryList', JSON.stringify(newState));
    setState(newState);
    navigate('/');
  };
  //다이어리 수정
  const diaryEdit = (el, title, content) => {
    el['title'] = title;
    el['content'] = content;
    setState([...state]);
    localStorage.setItem('diaryList', JSON.stringify([...state]));
    navigate('/');
  };
  const weatherIcon = (icon) => {
    //아 스위치로할까.....
    const style = {};
    if (icon === '04d' || icon === '04n' || icon === '03d' || icon === '03n') {
      style.backgroundPosition = '0 0';
    } else if (icon === '09d' || icon === '09n') {
      style.backgroundPosition = '-672px -96px';
    } else if (icon === '11d' || icon === '11n') {
      style.backgroundPosition = '-96px -288px';
    } else if (icon === '13d' || icon === '13n') {
      style.backgroundPosition = '0 -384px';
    } else if (icon === '50d' || icon === '50n') {
      style.backgroundPosition = '0 -192px';
    } else if (icon === '01d') {
      style.backgroundPosition = '-96px 0';
    } else if (icon === '01n') {
      style.backgroundPosition = '-192px 0';
    } else if (icon === '02d') {
      style.backgroundPosition = '-288px 0';
    } else if (icon === '02n') {
      style.backgroundPosition = '-384px 0';
    } else if (icon === '10d') {
      style.backgroundPosition = '-192px -96px';
    } else if (icon === '10n') {
      style.backgroundPosition = '-288px -96px';
    } else {
      style.backgroundPosition = '-384px -384px';
    }
    return style;
  };
  return (
    <div className='App'>
      {modalOpen && (
        <Modal
          modalContent={modalContent}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      <h2 className='title' onClick={() => navigate('/')}>
        색깔 일기장
      </h2>
      <WeatherDisplay weather={weather} weatherIcon={weatherIcon} />
      <DiaryToWrite diarySubmit={diarySubmit} />
      <Routes>
        <Route
          path='/'
          element={
            <DiaryList
              state={state}
              diaryDelete={diaryDelete}
              diaryEdit={diaryEdit}
              weatherIcon={weatherIcon}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setModalContent={setModalContent}
            />
          }
        />
        <Route
          path='/:id'
          element={
            <DetailDiary
              state={state}
              diaryDelete={diaryDelete}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setModalContent={setModalContent}
            />
          }
        />
        {/* //자세히보기 */}
        <Route
          path='/:id/edit'
          element={
            <EditDiary
              state={state}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setModalContent={setModalContent}
              diaryEdit={diaryEdit}
            />
          }
        />
        {/* //수정 */}
      </Routes>
    </div>
  );
}

export default App;
