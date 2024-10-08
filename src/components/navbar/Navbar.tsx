import axios from 'axios';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { SERVER_URL } from '../../constants/ServerURL';
import { Avatar, Badge, Dropdown, MenuProps } from 'antd';
import { CloseCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';

function Navbar() {
  const [device, setDevice] = useState<Device | null>(null);
  const userContext = useContext(UserContext);
  const deviceContext = useContext(DeviceContext);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          {device ? (
            <h3>
              {' '}
              Picked device: {device?.model}
              <CloseCircleOutlined
                className='circle-icon'
                onClick={removeDevice}
              />
            </h3>
          ) : (
            <h3>No device</h3>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <h3>Account balance</h3>
        </>
      ),
    },
  ];

  useEffect(() => {
    /*Use local storage and context provider to display notification without refresh*/
    const deviceUnparsed = localStorage.getItem('device');
    const deviceParsed = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';
    setDevice(deviceParsed);
  }, [deviceContext?.isDevicePicked]);

  const logout = async () => {
    const response = await axios.get(SERVER_URL('logout'), {
      withCredentials: true,
    });
    if (response.status === 200) {
      userContext?.setUser?.(null);
      userContext?.setSession(false);
    }
  };

  function removeDevice() {
    if (localStorage.getItem('device')) {
      localStorage.removeItem('device');
      deviceContext?.setDevicePicked(false);
    }
  }

  return (
    <div className='navbar'>
      <div className='links'>
        <div className='avatar'>
          <Dropdown
            menu={{ items }}
            placement='bottomLeft'
            arrow
            className='dropdown'
          >
            <Badge count={device ? 1 : ''}>
              <Avatar
                shape='square'
                size={60}
                icon={<UserOutlined />}
                className='avatar'
              />
            </Badge>
          </Dropdown>
        </div>

        <div className='logo'>
          <NavLink
            className='nav__link '
            to='/'
          >
            ZGen
          </NavLink>
        </div>

        <div>
          <NavLink
            to={'/upload'}
            className='nav__link'
          >
            Upload
          </NavLink>
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
          {!userContext?.user ? (
            <>
              <NavLink
                className='nav__link '
                to='/login'
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
