import './DiaryList.css';
import Diary from './Diary';
const DiaryList = ({ state, diaryDelete, diaryEdit }) => {
  return (
    <ul className='DiaryList'>
      {state.length !== 0 ? (
        state.map((el, index) => {
          return (
            <Diary
              key={el.origin_id}
              el={el}
              index={index}
              state={state}
              diaryDelete={diaryDelete}
              diaryEdit={diaryEdit}
            />
          );
        })
      ) : (
        <div className='noDiary'>
          쌓여있는 일기가 없어요!
          <br /> ಥ_ಥ
        </div>
      )}
    </ul>
  );
};

export default DiaryList;
