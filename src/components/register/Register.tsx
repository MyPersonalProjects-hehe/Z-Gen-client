import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  const registerUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const result: any = await axios.post(
        'http://localhost:5000/registerUser',
        { user }
      );

      if (result.status === 201) {
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message[0].message;
      alert(errorMessage);
    }
  };

  return (
    <div className='form__body'>
      <h1>Register</h1>
      <form onSubmit={(e) => registerUser(e)}>
        <div>
          <input
            type='username'
            placeholder='username'
            onChange={(e) => updateForm(e, 'username')}
          />
          <input
            type='email'
            placeholder='email'
            onChange={(e) => updateForm(e, 'email')}
          />
          <input
            type='phoneNumber'
            placeholder='phone number'
            onChange={(e) => updateForm(e, 'phoneNumber')}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => updateForm(e, 'password')}
          />
        </div>
        <button type='submit'>Click</button>
      </form>
    </div>
  );
}

export default Register;
