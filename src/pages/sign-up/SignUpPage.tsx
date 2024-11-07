import './sign-up-page.scss';
import Login from '../../components/sign-up/login/Login';
import Register from '../../components/sign-up/register/Register';
import { useState } from 'react';

function SignUpPage() {
  const [toggleScroll, setToggleScroll] = useState(false);

  return (
    <div className='sign-up-body'>
      <div className='poster'>
        <h1 className='text-style-wrapper'>
          Enjoy Generation`s best choice for telecom provider!
        </h1>
      </div>
      <div className='login__register'>
        {toggleScroll ? (
          <Register />
        ) : (
          <Login setToggleScroll={setToggleScroll} />
        )}
      </div>
    </div>
  );
}
export default SignUpPage;
