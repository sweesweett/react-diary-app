import React, { useState } from 'react';
import './DiaryList.css';
import Diary from '../Components/Diary';
const DiaryList = ({ state, setState }) => {
  return (
    <ul className='DiaryList'>
      {state.map((el, index) => {
        return (
          <Diary
            key={el.origin_id}
            el={el}
            index={index}
            state={state}
            setState={setState}
          />
        );
      })}
    </ul>
  );
};

export default DiaryList;
