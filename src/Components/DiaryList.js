import './DiaryList.css';
import { useContext } from 'react';
import { DataContext } from '../App';
import { Link } from 'react-router-dom';
const DiaryList = ({ weatherIcon }) => {
  let state = useContext(DataContext);
  return (
    <ul className='DiaryList'>
      {state.length !== 0 ? (
        state.map((el, index) => {
          return (
            <li
              key={el.origin_id}
              className='diary'
              style={{
                boxShadow: ` 1px 1px 10px ${el.color}1b,
              -1px -1px 10px ${el.color}1b
              ,inset 0px -30px 150px 15px ${el.color}20`,
              }}
            >
              <div className='diaryContent'>
                <div className='titleContent'>
                  <Link to={`/${el.origin_id}`}>
                    <h3 className='title'>
                      {el.title.length > 20
                        ? `${el.title.slice(0, 20)}...`
                        : el.title}
                    </h3>

                    <p className='content'>
                      {' '}
                      {el.content.length > 20
                        ? `${el.content.slice(0, 20)}...`
                        : el.content}
                    </p>
                  </Link>
                </div>
                <div className='dateNweatherIcon'>
                  <div className='date'>
                    {el.createdTime.split('. ')[1]}/
                    {el.createdTime.split('. ')[2]}
                  </div>
                  <div
                    className='weatherIcon'
                    style={{
                      ...weatherIcon(el.icon),
                      filter: `drop-shadow(0px 2px 3px ${el.color}99)`,
                    }}
                  ></div>
                </div>
              </div>
            </li>
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
