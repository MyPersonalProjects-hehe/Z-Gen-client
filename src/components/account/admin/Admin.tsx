import './admin.scss';
import adminImage from '../../../assets/account/admin-img.png';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  return (
    <div className='admin-body'>
      <div>
        <h1>What can we help you with today?</h1>
        <img
          src={adminImage}
          alt='image'
        />
      </div>
      <div className='functionalities'>
        <h1>Create:</h1>
        <span
          className='navigate-btn'
          onClick={() => navigate('/createPlan')}
        >
          Plan
        </span>
        <span
          className='navigate-btn'
          onClick={() => navigate('/uploadDevice')}
        >
          Device
        </span>
      </div>
    </div>
  );
}

export default Admin;
