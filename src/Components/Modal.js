import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ modalContent, modalOpen, setModalOpen }) => {
  // const [situation, setSituation] = useState('');
  const navigate = useNavigate();
  let doing = '';
  let btn = '';
  if (modalContent.target === 'edit') {
    doing = '이 일기를 수정하시겠습니까?';
    btn = '수정';
  } else if (modalContent.target === 'delete') {
    doing = '이 일기를 삭제하시겠습니까?';
    btn = '삭제';
  } else {
    doing = modalContent.target;
  }
  const handleYesOrNo = (e) => {
    if (e.target.className === 'yes') {
      if (modalContent.func !== undefined) {
        modalContent.func();
      }

      setModalOpen(!modalOpen);
      navigate('/');
    } else {
      setModalOpen(!modalOpen);
      return;
    }
  };

  return (
    <div className='Modal'>
      <div className='modalBg'></div>
      <div className='modalContent'>
        <div className='modalMessage'>{doing}</div>
        <div className='btns'>
          <button onClick={handleYesOrNo} className='yes'>
            {btn}할게요!
          </button>
          <button onClick={handleYesOrNo} className='no'>
            {btn}하지 않을래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
