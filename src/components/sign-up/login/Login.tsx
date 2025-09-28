import './login.scss';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants/ServerURL';
import { UserContext } from '../../../context/UserContext';
import { Button, ConfigProvider, Form, Input, notification } from 'antd';
import { FrownOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { openNotification } from '../../../helpers/notifications-functions/openNotification';
import { auth } from '../../../config/firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import googleLogo from '../../../assets/login/google-logo.png'

interface LoginProps {
  setToggleForm: (value: boolean) => void;
}

function Login({ setToggleForm }: LoginProps) {
  const [api, contextHolder] = notification.useNotification();
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

  const signInWithFirebase = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const responseFromFirebase = await signInWithPopup(auth, provider)

      if (responseFromFirebase.user) {
        const registerUserInMongo = await axios.post(SERVER_URL('registerUser'), {
          userForm: {
            username: responseFromFirebase.user.displayName,
            email: responseFromFirebase.user.email,
            phoneNumber: '',
            streamingPlatform: [],
            isLoggedByGoogle: true
          }
        }, { withCredentials: true })

        if (registerUserInMongo.status === 201) {
          userContext?.setSession(true);
          userContext?.setUser({
            email: registerUserInMongo.data.user.email,
            id: '',
            phoneNumber: registerUserInMongo.data.user.phoneNumber,
            username: registerUserInMongo.data.user.username,
            _id: registerUserInMongo.data.user._id
          })


          localStorage.setItem('user', JSON.stringify(registerUserInMongo.data.user));
          navigate('/');
        }

      } else {
        openNotification({
          api: api,
          icon: <FrownOutlined />,
          message: 'Warning!',
          description: `There was an issue signing with your account`,
        });
      }
    } catch (error: any) {
      if (error.message.includes('IdP denied access')) {
        openNotification({
          api: api,
          icon: <FrownOutlined />,
          message: 'Warning!',
          description: `Authentication declined`,
        });
      } else {
        console.log(error.message);

      }
    }

  }

  const loginUser = async () => {
    try {
      const response = await axios.post(
        SERVER_URL('loginUser'),
        { user },
        { withCredentials: true }
      );

      if (response.status === 200) {
        userContext?.setSession(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (error: any) {
      openNotification({
        api: api,
        icon: <FrownOutlined />,
        message: 'Warning!',
        description: `${error.response.data.message || error.message}`,
      });
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
      {contextHolder}
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
            className='login-btns'
            block
            htmlType='submit'
          >
            Log in
          </Button>
        </Form.Item>
        <Button
          style={{ marginBottom: 20 }}
          block
          className="login-btns"
          onClick={signInWithFirebase}
          icon={<img src={googleLogo} alt="Google" className="google-icon" />}
        >
          Continue with Google
        </Button>
        or <a onClick={() => setToggleForm(true)}>Register now!</a>
      </Form>
    </ConfigProvider>
  );
}

export default Login;
