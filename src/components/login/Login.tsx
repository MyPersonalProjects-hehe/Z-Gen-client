import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
        'http://localhost:5000/loginUser',
        { user },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const sessionResponse = await axios.post('http://localhost:5000/user', {
          withCredentials: true,
        });

        if (sessionResponse.data.user) {
          navigate('/', { state: { user: sessionResponse.data.user } });
        }
      }
    } catch (error: any) {
      alert(error.message);
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
