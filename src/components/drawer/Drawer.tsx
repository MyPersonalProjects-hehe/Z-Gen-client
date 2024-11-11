import './drawer.scss';
import { useContext, useState } from 'react';
import { Badge, Drawer } from 'antd';
import {
  CloseOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { Device } from '../../interfaces/device';
import logo from '../../assets/logo.png';

interface DrawerComponentProps {
  logout: () => void;
  removeDevice: () => void;
  device: Device | null;
}

function DrawerComponent({
  logout,
  device,
  removeDevice,
}: DrawerComponentProps) {
  const [open, setOpen] = useState(false);
  const userContext = useContext(UserContext);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='drawer'>
      <span className='drawer-logo'>
        <NavLink to='/'>
          <img
            src={logo}
            alt=''
          />
        </NavLink>
      </span>
      <span onClick={showDrawer}>
        <MenuFoldOutlined style={{ fontSize: 35 }} />
        {device && <Badge count={1} />}
      </span>
      <Drawer
        title='Menu'
        onClose={onClose}
        open={open}
      >
        <div className='drawer__links'>
          <NavLink
            to={'/devices'}
            className='link'
          >
            <TabletOutlined style={{ fontSize: 30 }} /> Devices
          </NavLink>

          <NavLink
            to={'/plans'}
            className='link'
          >
            <ReadOutlined style={{ fontSize: 30 }} /> Plans
          </NavLink>

          {userContext?.user ? (
            <>
              <NavLink
                to={'/account'}
                className='link'
              >
                <UserOutlined style={{ fontSize: 30 }} /> Account
              </NavLink>

              {device ? (
                <>
                  <span>
                    <ShoppingCartOutlined style={{ fontSize: 30 }} />{' '}
                    {device.model}
                    <Badge count={1} />
                  </span>

                  <span onClick={removeDevice}>
                    <CloseOutlined style={{ fontSize: 30 }} /> Remove device
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <ShoppingCartOutlined /> No picked devices
                  </span>

                  <span onClick={logout}>
                    <LogoutOutlined
                      className='logout-btn'
                      style={{ fontSize: 30 }}
                    />{' '}
                    Logout
                  </span>
                </>
              )}
            </>
          ) : (
            <NavLink
              className='link '
              to='/signUp'
            >
              <LoginOutlined style={{ fontSize: 30 }} /> Sign in
            </NavLink>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
