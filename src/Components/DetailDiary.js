import { useParams } from 'react-router-dom';
import './DetailDiary.css';

const DetailDiary = ({ state }) => {
  const { id } = useParams();
  const detail = state.filter((el) => el.origin_id === id)[0];

  return (
    <div
      className='DetailDiary'
      style={{
        boxShadow: ` 1px 1px 10px ${detail.color}1b,
    -1px -1px 10px ${detail.color}1b
    ,inset 0px -30px 150px 15px ${detail.color}20`,
      }}
    >
      <div className='btns'>버튼3개 , 뒤로가기 더보기버튼(수정삭제)</div>
      <div className='date'>작성한 날짜 ✨ {detail.createdTime}</div>
      <div className='title'>제목 🎇 {detail.title}</div>
      <div className='content'>{detail.content}</div>
    </div>
  );
};
export default DetailDiary;
