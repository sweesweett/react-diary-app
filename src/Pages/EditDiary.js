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
    if (
      window.confirm(
        '페이지를 벗어나시겠습니까? 수정하고 있는 내용이 저장되지 않습니다'
      )
    ) {
      navigate(`/${id}`);
    } else {
      return;
    }
  };
  return (
    <div className='EditDiary'>
      <button className='material-icons' onClick={backtoDetail}>
        arrow_back
      </button>
      <input
        type='text'
        ref={editTitle}
        defaultValue={detail.title}
        className='title'
      />
      <input type='text' defaultValue={detail.createdTime} disabled />
      <textarea
        name=''
        id=''
        cols='30'
        rows='10'
        ref={editContent}
        as
        defaultValue={detail.content}
        className='content'
      ></textarea>
      <button onClick={confirmEdit}>수정하기</button>
    </div>
  );
};

export default EditDiary;
