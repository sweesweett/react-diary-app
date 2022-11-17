import './App.css';
import DiaryToWrite from './Components/DiaryToWrite';
import DiaryList from './Components/DiaryList';
import WeatherDisplay from './Components/WeatherDisplay';
import Modal from './Components/Modal';
import DetailDiary from './Pages/DetailDiary';
import EditDiary from './Pages/EditDiary';
import uuid from 'react-uuid';
import React, { useEffect, useState, useReducer } from 'react';
import dummy from './Resource/dummy';
import { Routes, Route, useNavigate } from 'react-router-dom';
let initialState = JSON.parse(localStorage.getItem('diaryList'));
if (initialState === null) {
  initialState = [];
}
const weatherIcon = (icon) => {
  //아 스위치로할까.....
  const style = {};
  // switch (icon) {
  //   case '04d':
  //   case '04n':
  //   case '03d':
  //   case '03n':
  //     style.backgroundPosition = '0 0';
  //     break;
  //   case '09d':
  //   case '09n':
  //     style.backgroundPosition = '-672px -96px';
  //     break;

  //   case '11d':
  //   case '11n':
  //     style.backgroundPosition = '-96px -288px';
  //     break;
  //   case '13d':
  //   case '13n':
  //     style.backgroundPosition = '0 -384px';
  //     break;
  //   case '50d':
  //   case '50n':
  //     style.backgroundPosition = '0 -192px';
  //     break;
  //   case '01d':
  //     style.backgroundPosition = '-96px 0';
  //     break;
  //   case '01n':
  //     style.backgroundPosition = '-192px 0';
  //     break;
  //   case '02d':
  //     style.backgroundPosition = '-288px 0';
  //     break;
  //   case '02n':
  //     style.backgroundPosition = '-384px 0';
  //     break;
  //   case '10d':
  //     style.backgroundPosition = '-192px -96px';
  //     break;
  //   case '10n':
  //     style.backgroundPosition = '-288px -96px';
  //     break;
  //   default:
  //     style.backgroundPosition = '-384px -384px';
  // }
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
const reducer = (state, action) => {
  let newData = [];
  switch (action.type) {
    case 'CREATE': {
      newData = [action.data, ...state];
      localStorage.setItem('diaryList', JSON.stringify(newData));
      return newData;
    }
    case 'REMOVE': {
      newData = state.filter((el) => el.origin_id !== action.targetId);
      localStorage.setItem('diaryList', JSON.stringify(newData));
      return newData;
    }
    case 'EDIT': {
      newData = state.map((el) =>
        el.origin_id === action.data.id ? { ...action.data } : el
      );
      localStorage.setItem('diaryList', JSON.stringify(newData));
      return newData;
    }
    default:
      return state;
  }
};
export const DataContext = React.createContext();
export const DispatchContext = React.createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const [weather, setWeather] = useState({});
  // const [state, setState] = useState(initialState);
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
        icon: data.weather[0].icon
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
          icon: dummy.weather[0].icon
        })
      );
  }, []);
  //다이어리 저장
  const diarySubmit = (title, content, color) => {
    let origin_id = uuid();
    const createdTime = new Date().toLocaleString();
    const icon = weather.icon;
    dispatch({
      type: 'CREATE',
      data: {
        origin_id,
        title,
        content,
        color,
        createdTime,
        icon
      }
    });
    navigate('/');
  };
  //다이어리 삭제
  const diaryDelete = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
    navigate('/');
  };
  //다이어리 수정
  const diaryEdit = (el, title, content) => {
    el['title'] = title;
    el['content'] = content;
    dispatch({
      type: 'EDIT',
      data: el
    });

    // setState([...state]);
    // localStorage.setItem('diaryList', JSON.stringify([...state]));
    navigate('/');
  };

  return (
    <DataContext.Provider value={data}>
      <DispatchContext.Provider value={{ diaryDelete, diaryEdit, diarySubmit }}>
        <div className='App'>
          {modalOpen && (
            <Modal
              modalContent={modalContent}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
          <h2
            className='title'
            onClick={() => navigate('/')}
          >
            Colorful Diary
          </h2>
          <WeatherDisplay
            weather={weather}
            weatherIcon={weatherIcon}
          />
          <DiaryToWrite />
          <Routes>
            <Route
              path='/'
              element={<DiaryList weatherIcon={weatherIcon} />}
            />
            <Route
              path='/:id'
              element={
                <DetailDiary
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
                  setModalOpen={setModalOpen}
                  setModalContent={setModalContent}
                />
              }
            />
            {/* //수정 */}
          </Routes>
        </div>
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
