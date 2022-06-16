import './DiaryList.css';
const DiaryList = ({ state, setState }) => {
  return (
    <div className='DiaryList'>
      {state.map((el, index) => (
        <div
          className='diary'
          key={index}
          style={{
            boxShadow: ` 2px 2px 30px ${el.color}1b,
            -2px -2px 30px ${el.color}1b
            ,inset 0px -30px 150px 15px ${el.color}20`,
          }}
        >
          <div className='editDelete'>
            <span>수정</span>
            <span>삭제</span>
          </div>
          <div className='titleEtc'>
            <div className='title'>{el.title}</div>
            <div className='diaryEtc'>
              <span>
                {el.createdTime.split('. ')[1]}/{el.createdTime.split('. ')[2]}
              </span>
              <div
                className='weatherIcon'
                style={{ filter: `drop-shadow(0px 2px 3px ${el.color}99)` }}
              ></div>
            </div>
          </div>
          <div>{el.content}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
