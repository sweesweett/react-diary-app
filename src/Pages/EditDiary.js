import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDiary.css';

const EditDiary = ({
  state,
  diaryEdit,
  modalOpen,
  setModalOpen,
  setModalContent,
}) => {
  const editTitle = useRef();
  const editContent = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = state.filter((el) => el.origin_id === id)[0];
  const confirmEdit = () => {
    setModalOpen(!modalOpen);
    setModalContent({
      target: 'edit',
      func: () =>
        diaryEdit(detail, editTitle.current.value, editContent.current.value),
    });
  };
  const backtoDetail = () => {
    setModalOpen(!modalOpen);
    setModalContent({
      target: `페이지를 벗어나시겠습니까?\n 수정하고 있는 내용이 저장되지 않습니다.`,
      func: undefined,
    });
  };
  return (
    <div
      className='EditDiary'
      style={{
        boxShadow: ` 1px 1px 10px ${detail.color}1b,
  -1px -1px 10px ${detail.color}1b
  ,inset 0px -30px 150px 15px ${detail.color}20`,
      }}
    >
      <button className='material-icons' onClick={backtoDetail}>
        arrow_back
      </button>
      <label htmlFor='editTitle'>제목</label>
      <input
        type='text'
        ref={editTitle}
        defaultValue={detail.title}
        className='title'
        id='editTitle'
      />
      <label htmlFor='editDate'>작성된 날짜</label>
      <input
        type='text'
        id='editDate'
        className='date'
        defaultValue={detail.createdTime}
        disabled
      />
      <label htmlFor='editContent'>내용</label>
      <textarea
        cols='30'
        rows='9'
        ref={editContent}
        id='editContent'
        defaultValue={detail.content}
        className='content'
      ></textarea>
      <button onClick={confirmEdit}>수정하기</button>
    </div>
  );
};

export default EditDiary;
