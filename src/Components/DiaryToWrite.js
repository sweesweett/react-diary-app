import { useRef } from 'react';
import uuid from 'react-uuid';
import './DiaryToWrite.css';

const DiaryToWrite = ({ state, setState }) => {
  const title = useRef();
  const content = useRef();
  const color = useRef();
  const handleInput = (e) => {
    // console.log(e.target.value);
  };
  const diarySubmit = () => {
    if (title.current.value === '' || content.current.value === '') {
      alert('일기를 작성해주세요');
      return;
    }
    let origin_id = uuid();
    const createdTime = new Date().toLocaleString();
    localStorage.setItem(
      'diaryList',
      JSON.stringify([
        {
          origin_id,
          [title.current.name]: title.current.value,
          [content.current.name]: content.current.value,
          [color.current.name]: color.current.value,
          createdTime,
        },
        ...state,
      ])
    );
    setState([
      {
        origin_id,
        [title.current.name]: title.current.value,
        [content.current.name]: content.current.value,
        [color.current.name]: color.current.value,
        createdTime,
      },
      ...state,
    ]);
    title.current.value = '';
    content.current.value = '';
    color.current.value = '';
  };
  return (
    <div className='DiaryToWrite'>
      <div>
        <input
          type='text'
          className='title'
          name='title'
          onChange={handleInput}
          ref={title}
          placeholder='제목을 적어주세요'
        />
        <input ref={color} className='color' name='color' type='color' />
      </div>
      <div>
        <textarea
          ref={content}
          className='content'
          name='content'
          placeholder='오늘의 일기를 작성해주세요. 오늘의 기분을 컬러피커로 표현해주세요'
        ></textarea>
      </div>

      <button className='submitBtn' onClick={diarySubmit}>
        등록하기
      </button>
    </div>
  );
};

export default DiaryToWrite;
