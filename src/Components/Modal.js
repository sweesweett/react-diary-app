import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ modalContent, modalOpen, setModalOpen }) => {
  // const [situation, setSituation] = useState('');
  const navigate = useNavigate();
  let doing = '';
  if (modalContent.target === 'edit') {
    doing = '수정';
  } else if (modalContent.target === 'delete') {
    doing = '삭제';
  }
  const handleYesOrNo = (e) => {
    if (e.target.className === 'yes') {
      modalContent.func();
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
        <div className='modalMessage'>이 일기를 {doing}하시겠습니까?</div>
        <div className='btns'>
          <button onClick={handleYesOrNo} className='yes'>
            {doing}할게요!
          </button>
          <button onClick={handleYesOrNo} className='no'>
            {doing}하지 않을래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
