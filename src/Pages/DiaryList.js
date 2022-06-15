import './DiaryList.css';
const DiaryList = ({ state, setState }) => {
  return (
    <div className='DiaryList'>
      {state.map((el, index) => (
        <div
          className='diary'
          key={index}
          style={{
            boxShadow: `inset 1px 1px 30px ${el.color}45,
          inset -1px -1px 30px ${el.color}45`,
          }}
        >
          <div className='editDelete'>
            <span>수정</span>
            <span>삭제</span>
          </div>
          <div className='titleEtc'>
            <div className='title'>{el.title}</div>
            <div className='diaryEtc'>
              <span>월.일</span>
              <span>이모지</span>
              <div className='test'></div>
            </div>
          </div>
          <div>{el.content}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
