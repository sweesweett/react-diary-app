import React, { useState } from 'react';
import './DiaryList.css';
import Diary from '../Components/Diary';
const DiaryList = ({ state, setState }) => {
  return (
    <ul className='DiaryList'>
      {state.length !== 0 ? (
        state.map((el, index) => {
          return (
            <Diary
              key={el.origin_id}
              el={el}
              index={index}
              state={state}
              setState={setState}
            />
          );
        })
      ) : (
        <div className='noDiary'>
          쌓여있는 일기가 없어요!
          <br /> ಥ_ಥ
        </div>
      )}
    </ul>
  );
};

export default DiaryList;
