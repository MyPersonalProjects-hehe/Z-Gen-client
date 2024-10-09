import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants/ServerURL';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const userContext = useContext(UserContext);

  const updateForm = (e: ChangeEvent<HTMLInputElement>, prop: string) => {
    setUserForm({
      ...userForm,
      [prop]: e.target.value,
    });
  };

  const registerUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const result: any = await axios.post(
        SERVER_URL('registerUser'),
        {
          userForm,
        },
        { withCredentials: true }
      );

      if (result.status === 201) {
        userContext?.setSession(true);
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message[0].message;
      alert(errorMessage);
    }
  };

  return (
    <div className='form-body'>
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

export default RegisterPage;
