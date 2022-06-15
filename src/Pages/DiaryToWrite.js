import { useRef } from 'react';

const DiaryToWrite = ({ state, setState }) => {
  const title = useRef();
  const content = useRef();
  const color = useRef();

  const handleInput = (e) => {
    // console.log(e.target.value);
  };
  const diarySubmit = () => {
    // if(title.current.value='')
    setState([
      ...state,
      {
        [title.current.name]: title.current.value,
        [content.current.name]: content.current.value,
        [color.current.name]: color.current.value,
      },
    ]);
  };
  return (
    <div className='diaryToWrite'>
      <div>
        <input
          type='text'
          className='title'
          name='title'
          onChange={handleInput}
          ref={title}
        />
      </div>
      <div>
        <textarea ref={content} className='content' name='content'></textarea>
      </div>
      <div>
        <input ref={color} className='color' name='color' type='color' />
      </div>
      <button onClick={diarySubmit}>등록하기</button>
    </div>
  );
};

export default DiaryToWrite;
