import { useRef } from 'react';

import './DiaryToWrite.css';
const DiaryToWrite = ({ diarySubmit }) => {
  const title = useRef();
  const content = useRef();
  const color = useRef();
  const handleInput = (e) => {
    // console.log(e.target.value);
  };
  const handleSubmit = () => {
    if (title.current.value === '' || content.current.value === '') {
      alert('일기를 작성해주세요');
      return;
    }
    diarySubmit(
      title.current.value,
      content.current.value,
      color.current.value
    );
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
          onChange={handleInput}
          ref={title}
          placeholder='제목을 적어주세요'
        />
        <input ref={color} className='color' type='color' />
      </div>
      <div>
        <textarea
          ref={content}
          className='content'
          placeholder='오늘의 일기를 작성해주세요. 오늘의 기분을 컬러피커로 표현해주세요'
        ></textarea>
      </div>

      <button className='submitBtn' onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
};

export default DiaryToWrite;
