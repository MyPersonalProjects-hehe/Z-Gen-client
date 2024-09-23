import { useLocation } from 'react-router-dom';
import './home.scss';

function Home() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className='body'>
      <h1>Hello {user?.username}</h1>
      <div className='user'></div>
    </div>
  );
}

export default Home;
