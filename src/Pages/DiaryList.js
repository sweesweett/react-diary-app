import './DiaryList.css';
const DiaryList = ({ state, setState }) => {
  return (
    <div className='DiaryList'>
      {state.map((el, index) => (
        <div
          className='diary'
          key={index}
          style={{
            boxShadow: ` 1px 1px 10px ${el.color}1b,
            -1px -1px 10px ${el.color}1b
            ,inset 0px -30px 150px 15px ${el.color}20`,
          }}
        >
          <div className='editDelete'>
            <span>수정</span>
            <span>삭제</span>
          </div>
          <div className='diaryContent'>
            <div className='titleContent'>
              <h3 className='title'>{el.title}</h3>
              <p className='content'>{el.content}</p>
            </div>
            <div className='dateNweatherIcon'>
              <div className='date'>
                {el.createdTime.split('. ')[1]}/{el.createdTime.split('. ')[2]}
              </div>
              <div
                className='weatherIcon'
                style={{ filter: `drop-shadow(0px 2px 3px ${el.color}99)` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
