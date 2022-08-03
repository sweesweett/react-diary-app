import React, { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './DetailDiary.css';

const DetailDiary = ({
  state,
  diaryDelete,
  modalOpen,
  setModalOpen,
  setModalContent,
}) => {
  const { id } = useParams();
  const [moreBtnOpen, setmoreBtnOpen] = useState(false);
  const detail = state.filter((el) => el.origin_id === id)[0];
  const navigate = useNavigate();
  const handleBtnOpen = () => {
    setmoreBtnOpen(!moreBtnOpen);
  };
  const handleDelete = () => {
    setModalOpen(!modalOpen);
    setModalContent({
      target: 'delete',
      func: () => diaryDelete(id),
    });
    setmoreBtnOpen(false);
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
          <li className='edit'>
            <Link to={`/${id}/edit`}>수정</Link>
          </li>
          <li className='delete' onClick={handleDelete}>
            삭제
          </li>
        </ul>
      </div>

      <div className='title'>✨ {detail.title}</div>
      <div className='date'>{detail.createdTime}</div>
      <div className='content'>
        <p>{detail.content}</p>
      </div>
    </div>
  );
};
export default DetailDiary;
