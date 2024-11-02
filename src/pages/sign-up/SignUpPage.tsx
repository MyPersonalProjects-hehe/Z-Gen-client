import './sign-up-page.scss';
import imagePoster from '../../assets/login/new.png';
import Login from '../../components/sign-up/login/Login';
import Register from '../../components/sign-up/register/Register';
import { useEffect, useState } from 'react';

function SignUpPage() {
  const [toggleScroll, setToggleScroll] = useState(false);

  useEffect(() => {
    if (toggleScroll) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [toggleScroll]);

  return (
    <div className='sign-up-body'>
      <div className='poster'>
        <h1 className='text-style-wrapper'>
          Enjoy Generation`s best choice for telecom provider!
        </h1>

        <img
          src={imagePoster}
          alt='image-poster'
        />
      </div>
      <div className='login__register'>
        <Login setToggleScroll={setToggleScroll} />
        {toggleScroll && <Register />}
      </div>
    </div>
  );
}
export default SignUpPage;
