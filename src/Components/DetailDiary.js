import { useParams } from 'react-router-dom';
import './DetailDiary.css';

const DetailDiary = ({ state }) => {
  const { id } = useParams();
  const detail = state.filter((el) => el.origin_id === id)[0];

  return (
    <div className='DetailDiary'>
      <div>{detail.title}</div>
      <div>{detail.content}</div>
    </div>
  );
};
export default DetailDiary;
