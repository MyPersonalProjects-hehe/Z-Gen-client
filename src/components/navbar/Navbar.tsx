import axios from 'axios';
import './navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { SERVER_URL } from '../../constants/ServerURL';
import { Avatar, Badge, Dropdown, MenuProps, Tooltip } from 'antd';
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';
import logo from '../../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const userContext = useContext(UserContext);
  const deviceContext = useContext(DeviceContext);

  useEffect(() => {
    /*Use local storage and context provider to display notification without refresh*/
    const deviceUnparsed = localStorage.getItem('device');
    const deviceParsed = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';
    setDevice(deviceParsed);
  }, [deviceContext?.isDevicePicked]);

  async function logout() {
    const response = await axios.get(SERVER_URL('logout'), {
      withCredentials: true,
    });
    if (response.status === 200) {
      userContext?.setUser?.(null);
      userContext?.setSession(false);
      deviceContext?.setDevicePicked((prev) => !prev);
      localStorage.removeItem('device');
      localStorage.removeItem('plan');
      navigate('/signUp');
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          {device ? (
            <span className='menu-item'>
              <Tooltip
                placement='topLeft'
                title={device.model}
              >
                <ShoppingCartOutlined style={{ fontSize: 25 }} />
                <Badge count={1}></Badge>
              </Tooltip>
            </span>
          ) : (
            <span className='menu-item'>
              <Tooltip
                placement='topLeft'
                title='No device picked'
              >
                <ShoppingCartOutlined style={{ fontSize: 25 }} />
              </Tooltip>
            </span>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <span onClick={() => navigate('/account')}>
            <UserOutlined style={{ fontSize: 25 }} />
          </span>
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <span onClick={logout}>
            <LogoutOutlined style={{ fontSize: 25 }} />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className='navbar poster'>
      <div className='links'>
        <div className='logo'>
          <NavLink
            className='nav__link '
            to='/'
          >
            <img
              src={logo}
              alt=''
            />
          </NavLink>
        </div>

        <div>
          <NavLink
            to={'/devices'}
            className='nav__link'
          >
            Devices
          </NavLink>
          <NavLink
            to={'/plans'}
            className='nav__link'
          >
            Plans
          </NavLink>
          {userContext?.user ? (
            <Dropdown
              menu={{ items }}
              placement='bottomLeft'
              arrow
              className='dropdown'
            >
              <Badge
                count={device ? 1 : ''}
                className='avatar nav__link'
              >
                <Avatar
                  shape='square'
                  size={50}
                  icon={<UserOutlined />}
                />
              </Badge>
            </Dropdown>
          ) : (
            <NavLink
              className='nav__link '
              to='/signUp'
            >
              Sign up
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
