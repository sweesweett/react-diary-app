import './DiaryList.css';
import React, { useRef, useState, useEffect } from 'react';
const Diary = ({
  el,
  index,
  diaryDelete,
  diaryEdit,
  weatherIcon,
  modalOpen,
  setModalOpen,
  setModalContent,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const editTitle = useRef();
  const editContent = useRef();
  useEffect(() => {
    if (modalOpen === false && openEdit === true) {
      setOpenEdit(!openEdit);
    } // 의존성 배열 오류남.. useMemo빨리배워야함 ㅜㅠㅠ
  }, [modalOpen]);
  // const handleDelete = (index) => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     state.splice(index, 1);
  //     localStorage.setItem('diaryList', JSON.stringify([...state]));
  //     setState([...state]);
  //   } else {
  //     return;
  //   }
  // };
  const handleDelete = () => {
    setModalOpen(!modalOpen);
    setModalContent({
      target: 'delete',
      func: () => diaryDelete(index),
    });
  };
  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };
  const confirmEdit = () => {
    setModalOpen(!modalOpen);
    setModalContent({
      target: 'edit',
      func: () =>
        diaryEdit(el, editTitle.current.value, editContent.current.value),
    });
    // setOpenEdit(!openEdit);
    // if (window.confirm('진짜 수정하시겠습니까?')) {
    //   diaryEdit(el, editTitle.current.value, editContent.current.value);
    //   setOpenEdit(!openEdit);
    // } else {
    //   setOpenEdit(!openEdit);
    //   return;
    // }
  };
  return (
    <li
      className='diary'
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
          <div className='editDiary'>
            <div className='editTitleContent'>
              <input
                className='editTitle'
                type='text'
                ref={editTitle}
                defaultValue={el.title}
              />
              <textarea
                className='editContent'
                ref={editContent}
                defaultValue={el.content}
              ></textarea>
            </div>
            <button className='confirmBtn' onClick={confirmEdit}>
              수정하기
            </button>
          </div>
        ) : (
          <div className='titleContent'>
            <h3 className='title'>{el.title}</h3>
            <p className='content' style={{ whiteSpace: 'pre-wrap' }}>
              {el.content}
            </p>
          </div>
        )}

        <div className='dateNweatherIcon'>
          <div className='date'>
            {el.createdTime.split('. ')[1]}/{el.createdTime.split('. ')[2]}
          </div>
          <div
            className='weatherIcon'
            style={{
              ...weatherIcon(el.icon),
              filter: `drop-shadow(0px 2px 3px ${el.color}99)`,
            }}
          ></div>
        </div>
      </div>
    </li>
  );
};
export default Diary;
