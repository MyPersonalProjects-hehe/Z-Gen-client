import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { SERVER_URL } from '../../constants/ServerURL';
import axios from 'axios';
import './navbar.scss';

function Navbar() {
  const userContext = useContext(UserContext);

  const logout = async () => {
    const response = await axios.get(SERVER_URL('logout'), {
      withCredentials: true,
    });
    if (response.status === 200) {
      userContext?.setUser?.(null);
      userContext?.setSession(false);
    }
  };

  return (
    <div className='navbar'>
      <div className='links'>
        <div className='logo'>
          <NavLink
            className='nav__link '
            to='/'
          >
            ZGen
          </NavLink>
        </div>

        <NavLink
          className='nav__link '
          to='/login'
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
