import './login-page.scss';
import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants/ServerURL';
import { UserContext } from '../../context/UserContext';
import { Button, ConfigProvider } from 'antd';
import imagePoster from '../../assets/login/login-img.jpg';
import RegisterPage from '../register/RegisterPage';

function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  const loginUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        SERVER_URL('loginUser'),
        { user },
        { withCredentials: true }
      );
      if (response.status === 200) {
        userContext?.setSession(true);
        navigate('/');
      }
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'white',
        },
        components: {
          Button: {
            defaultHoverColor: 'black',
          },
        },
      }}
    >
      <div className='login-body'>
        <div className='image__poster'>
          <h1>Enjoy Generation`s best choice for telecom provider!</h1>

          <img
            src={imagePoster}
            alt='image-poster'
          />
        </div>
        <div className='form__body'>
          <h1>Login</h1>
          <form>
            <input
              type='email'
              placeholder='email'
              onChange={(e) => updateForm(e, 'email')}
            />
            <input
              type='password'
              placeholder='password'
              onChange={(e) => updateForm(e, 'password')}
            />
            <Button
              className='btn btn-login'
              onClick={(e) => loginUser(e)}
            >
              click
            </Button>
          </form>
        </div>
        <RegisterPage></RegisterPage>
      </div>
    </ConfigProvider>
  );
}

export default LoginPage;
