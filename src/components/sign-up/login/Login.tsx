import './login.scss';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants/ServerURL';
import { UserContext } from '../../../context/UserContext';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

interface LoginProps {
  setToggleScroll: (value: boolean) => void;
}

function Login({ setToggleScroll }: LoginProps) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const updateForm = (e: any, prop: string) => {
    setUser({
      ...user,
      [e]: prop,
    });
  };

  const loginUser = async () => {
    try {
      console.log(user);

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
          colorPrimary: '#0e2447',
        },
        components: {
          Button: {
            lineWidth: 30,
          },
        },
      }}
    >
      <h1>Login</h1>
      <Form
        name='login'
        initialValues={{ remember: true }}
        style={{ width: 400, borderColor: '#0e2447' }}
        onFinish={loginUser}
        onFieldsChange={(e) => updateForm(e[0].name[0], e[0].value)}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please write your email!' }]}
        >
          <Input
            className='login-input'
            prefix={<MailOutlined />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please write your password!' }]}
        >
          <Input
            className='login-input'
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type='primary'
            htmlType='submit'
          >
            Log in
          </Button>
          or <a onClick={() => setToggleScroll(true)}>Register now!</a>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default Login;
