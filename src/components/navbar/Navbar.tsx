import './navbar.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Avatar, Badge, Dropdown, MenuProps, Tooltip } from 'antd';
import {
  CloseOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';
import logo from '../../assets/logo.png';
import DrawerComponent from '../drawer/Drawer';
import { PurchasedPlatformContext } from '../../context/PurchasedPlatformContext';

function Navbar() {
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const userContext = useContext(UserContext);
  const deviceContext = useContext(DeviceContext);
  const platformContext = useContext(PurchasedPlatformContext);
  const { pathname } = useLocation();
  /**Menu state for opening/closing  drawer*/
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /*Use local storage and context provider
     to display notification without refresh*/
    const deviceUnparsed = localStorage.getItem('device');
    const deviceParsed = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';
    setDevice(deviceParsed);
  }, [deviceContext?.isDevicePicked]);

  function logout() {
    const userUnparsed = localStorage.getItem('user');
    const user = userUnparsed ? JSON.parse(userUnparsed) : '';
    if (user) {
      userContext?.setUser?.(null);
      userContext?.setSession(false);
      deviceContext?.setDevicePicked((prev) => !prev);
      platformContext?.setPurchasedPlatform(null);
      localStorage.removeItem('device');
      localStorage.removeItem('plan');
      localStorage.removeItem('user');
      setOpen(false);
      navigate('/signUp');
    }
  }

  const removeDevice = () => {
    localStorage.removeItem('device');
    deviceContext?.setDevicePicked((prev: boolean) => !prev);
    setOpen(false);
  };

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
          {device && (
            <span onClick={removeDevice}>
              <Tooltip
                placement='topLeft'
                title='Remove stored device?'
              >
                <CloseOutlined style={{ fontSize: 25 }} />
              </Tooltip>
            </span>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <span onClick={() => navigate('/account')}>
            <UserOutlined style={{ fontSize: 25 }} />
          </span>
        </>
      ),
    },
    {
      key: '4',
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
          <NavLink to='/'>
            <img
              src={logo}
              alt=''
            />
          </NavLink>
        </div>

        <div>
          <NavLink
            to={'/devices'}
            className={
              pathname === '/devices' ? 'nav__link__active' : 'nav__link'
            }
          >
            Devices
          </NavLink>
          <NavLink
            to={'/plans'}
            className={
              pathname === '/plans' ? 'nav__link__active' : 'nav__link'
            }
          >
            Plans
          </NavLink>
          <NavLink
            to={'/platforms'}
            className={
              pathname === '/platforms' ? 'nav__link__active' : 'nav__link'
            }
          >
            Streaming Platforms
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
              className={
                pathname === '/signUp' ? 'nav__link__active' : 'nav__link'
              }
              to='/signUp'
            >
              Sign up
            </NavLink>
          )}
        </div>
      </div>
      <div className='drawer'>
        <DrawerComponent
          device={device}
          open={open}
          logout={logout}
          removeDevice={removeDevice}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}

export default Navbar;
