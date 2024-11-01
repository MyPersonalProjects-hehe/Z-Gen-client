import './sign-up-page.scss';
import imagePoster from '../../assets/login/login-img.jpg';
import Login from '../../components/sign-up/login/Login';
import Register from '../../components/sign-up/register/Register';

function SignUpPage() {
  return (
    <div className='sign-up-body'>
      <div className='image__poster'>
        <h1>Enjoy Generation`s best choice for telecom provider!</h1>

        <img
          src={imagePoster}
          alt='image-poster'
        />
      </div>
      <div className='forms'>
        <Login />
        <Register />
      </div>
    </div>
  );
}
export default SignUpPage;
