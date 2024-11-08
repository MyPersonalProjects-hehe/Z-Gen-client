import './device-card.scss';
import { Button, notification } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../../interfaces/device';
import { DeviceContext } from '../../../context/PickedDeviceContext';
import {
  EuroCircleOutlined,
  SmileOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { UserContext } from '../../../context/UserContext';
import skeletonImage from '../../../assets/skeleton.png';
import { openNotification } from '../../../helpers/notifications-functions/openNotification';
import { EligibleUser } from '../../../context/EligibleUser';

interface DeviceProp {
  device: Device;
}

function DeviceCard({ device }: DeviceProp) {
  const navigate = useNavigate();
  const deviceContext = useContext(DeviceContext);
  const userContext = useContext(UserContext);
  const eligibilityContext = useContext(EligibleUser);
  const [api, contextHolder] = notification.useNotification();

  const storeChosenDevice = (device: Device) => {
    if (device && userContext?.user && eligibilityContext?.isEligible) {
      localStorage.setItem('device', JSON.stringify(device));
      deviceContext?.setDevicePicked((prev) => !prev);
      openNotification({
        api: api,
        icon: <SmileOutlined />,
        message: 'Success',
        description: 'Device stored!',
      });
    } else if (!eligibilityContext?.isEligible && userContext?.user) {
      openNotification({
        api: api,
        icon: <WarningOutlined />,
        message: 'Warning',
        description: 'You are not eligible for device purchasing!',
      });
    } else {
      openNotification({
        api: api,
        icon: <WarningOutlined />,
        message: 'Warning',
        description: 'Please login to store device!',
      });
    }
  };

  const navigateToCharacteristics = (deviceId: any) => {
    navigate(`/characteristics/${deviceId}`);
  };

  return (
    <div
      className='device'
      key={device._id}
    >
      {contextHolder}
      <h2>{device.model}</h2>
      <img
        src={device.mainImage}
        alt={skeletonImage}
      />
      <h3>{device.RAM}</h3>
      <h2 className='price'>
        {device.price} <EuroCircleOutlined />{' '}
      </h2>
      <div className='buttons'>
        <Button
          className='btn'
          onClick={() => storeChosenDevice(device)}
        >
          Pick device
        </Button>
        <Button
          className='btn'
          onClick={() => navigateToCharacteristics(device._id)}
        >
          Characteristics
        </Button>
      </div>
    </div>
  );
}

export default DeviceCard;
