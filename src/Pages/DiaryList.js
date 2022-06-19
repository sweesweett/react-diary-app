import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { useRef, useState } from 'react';
import './DiaryList.css';
const DiaryList = ({ state, setState }) => {
  const [openEdit, setOpenEdit] = useState('false');
  return (
    <ul className='DiaryList'>
      {state.map((el, index) => {
        const handleDelete = () => {
          if (window.confirm('삭제하시겠습니까?')) {
            state.splice(index, 1);
            localStorage.setItem('diaryList', JSON.stringify([...state]));
            setState([...state]);
          } else {
            return;
          }
        };
        const handleEdit = () => {
          setOpenEdit(!openEdit);
        };
        return (
          <li
            className='diary'
            key={el.origin_id}
            style={{
              boxShadow: ` 1px 1px 10px ${el.color}1b,
            -1px -1px 10px ${el.color}1b
            ,inset 0px -30px 150px 15px ${el.color}20`,
            }}
          >
            <div className='editDelete'>
              <span onClick={handleEdit}>수정</span>
              <span onClick={handleDelete}>삭제</span>
            </div>
            <div className='diaryContent'>
              {openEdit === true ? (
                <div className='editContent'>
                  <input type='text' />
                  <textarea />
                </div>
              ) : (
                <div className='titleContent'>
                  <h3 className='title'>{el.title}</h3>
                  <p className='content'>{el.content}</p>
                </div>
              )}

              <div className='dateNweatherIcon'>
                <div className='date'>
                  {el.createdTime.split('. ')[1]}/
                  {el.createdTime.split('. ')[2]}
                </div>
                <div
                  className='weatherIcon'
                  style={{ filter: `drop-shadow(0px 2px 3px ${el.color}99)` }}
                ></div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DiaryList;
