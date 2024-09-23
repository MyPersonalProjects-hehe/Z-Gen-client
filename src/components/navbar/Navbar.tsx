import { NavLink } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='links'>
        <NavLink
          className='nav__link'
          to='/register'
        >
          Register
        </NavLink>
        <NavLink
          className='nav__link '
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className='nav__link'
          to='/login'
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
