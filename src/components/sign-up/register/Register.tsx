import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { SERVER_URL } from '../../../constants/ServerURL';
import { Button, ConfigProvider, Form, Input } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

function Register() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const userContext = useContext(UserContext);

  const updateForm = (e: any, prop: string) => {
    setUserForm({
      ...userForm,
      [e]: prop,
    });
  };

  const registerUser = async () => {
    try {
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0e2447',
        },
      }}
    >
      <h1>Register</h1>
      <Form
        name='register'
        initialValues={{ remember: true }}
        style={{ width: 400 }}
        onFinish={registerUser}
        onFieldsChange={(e) => updateForm(e[0].name[0], e[0].value)}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please write your username!' }]}
        >
          <Input
            className='login-input'
            prefix={<UserOutlined />}
            placeholder='Username'
          />
        </Form.Item>

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

        <Form.Item
          name='phoneNumber'
          rules={[
            { required: true, message: 'Please write your phone number!' },
          ]}
        >
          <Input
            className='login-input'
            prefix={<PhoneOutlined />}
            placeholder='Phone number'
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type='primary'
            htmlType='submit'
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default Register;
