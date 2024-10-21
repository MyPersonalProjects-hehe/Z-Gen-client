import './account.scss';
import { notification, Progress, Tooltip } from 'antd';
import pngImage from '../../assets/account-page.png';
import {
  CloseOutlined,
  FileTextOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { openNotification } from '../../helpers/notifications-functions/openNotification';
import { useContext } from 'react';
import { DeviceContext } from '../../context/PickedDeviceContext';

function Account() {
  const [api, contextHolder] = notification.useNotification();
  const deviceContext = useContext(DeviceContext);
  const deviceUnparsed = localStorage.getItem('device');
  const deviceParsed = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';

  function removeDevice() {
    if (localStorage.getItem('device')) {
      localStorage.removeItem('device');
      deviceContext?.setDevicePicked((prev: boolean) => !prev);
      openNotification({
        api: api,
        icon: <SmileOutlined />,
        message: 'Success',
        description: 'Device removed!',
      });
    }
  }
  return (
    <div className='account-body'>
      {contextHolder}
      <img
        src={pngImage}
        alt='image'
      />

      <div className='account__content'>
        {deviceParsed && (
          <div className='device__picked'>
            <h2>
              Device picked: {deviceParsed.model}{' '}
              <Tooltip
                placement='bottomLeft'
                title='Remove item'
              >
                <CloseOutlined
                  className='remove-device'
                  onClick={removeDevice}
                />
              </Tooltip>
            </h2>
          </div>
        )}
        <div className='contract__usage'>
          <span>
            <h2>MB</h2>
            <Progress
              percent={100}
              type='line'
              strokeColor={'#7e31a1'}
              status='exception'
            />
          </span>
          <Progress
            percent={31}
            type='circle'
            strokeColor={'#7e31a1'}
          />

          <span>
            <h2>Minutes</h2>
            <Progress
              percent={20}
              type='line'
              strokeColor={'#7e31a1'}
            />
          </span>
          <Progress
            percent={20}
            type='circle'
            strokeColor={'#7e31a1'}
          />
        </div>

        <div className='blocks'>
          <div className='row'>
            <h3 className='card'>
              <FileTextOutlined /> Contract
            </h3>
            <h3 className='card'>Contract</h3>
            <h3 className='card'>Contract</h3>
          </div>
          <div className='row'>
            <h3 className='card'>Device</h3>
            <h3 className='card'>Device</h3>
            <h3 className='card'>Device</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
