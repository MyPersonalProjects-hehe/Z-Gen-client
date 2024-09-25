import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants/ServerURL';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

function Login() {
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
    <div className='form__body'>
      <h1>Login</h1>
      <form onSubmit={(e) => loginUser(e)}>
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
        <button type='submit'>click</button>
      </form>
    </div>
  );
}

export default Login;
