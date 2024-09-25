import { useContext } from 'react';
import './home.scss';
import { UserContext } from '../../context/UserContext';

function Home() {
  const userContext = useContext(UserContext);
  console.log(userContext);

  return (
    <div className='body'>
      <h1>Hello {userContext?.user?.username}</h1>
      <div className='user'></div>
    </div>
  );
}

export default Home;
