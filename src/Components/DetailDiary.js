import React, { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailDiary.css';

const DetailDiary = ({ state }) => {
  const { id } = useParams();
  const [moreBtnOpen, setmoreBtnOpen] = useState(false);
  const detail = state.filter((el) => el.origin_id === id)[0];
  const navigate = useNavigate();
  const handleBtnOpen = () => {
    setmoreBtnOpen(!moreBtnOpen);
  };
  return (
    <div
      className='DetailDiary'
      style={{
        boxShadow: ` 1px 1px 10px ${detail.color}1b,
    -1px -1px 10px ${detail.color}1b
    ,inset 0px -30px 150px 15px ${detail.color}20`,
      }}
    >
      <div className='btns'>
        <button className='material-icons' onClick={() => navigate('/')}>
          arrow_back
        </button>

        <button className='material-icons' onClick={handleBtnOpen}>
          more_vert
        </button>
        <ul
          className='editNDelete'
          style={moreBtnOpen ? { display: 'block' } : { display: 'none' }}
        >
          <li className='edit'>수정</li>
          <li className='delete'>삭제</li>
        </ul>
      </div>
      <div className='date'>작성한 날짜 ✨ {detail.createdTime}</div>
      <div className='title'>제목 🎇 {detail.title}</div>

      <div className='content'>
        내용 🌟
        <p>{detail.content}</p>
      </div>
    </div>
  );
};
export default DetailDiary;
