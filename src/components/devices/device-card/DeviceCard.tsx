import './device-card.scss';
import { Button, notification } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../../interfaces/device';
import { DeviceContext } from '../../../context/PickedDeviceContext';
import { SmileOutlined } from '@ant-design/icons';

interface DeviceProp {
  device: Device;
}

function DeviceCard({ device }: DeviceProp) {
  const deviceContext = useContext(DeviceContext);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = () => {
    api.open({
      message: 'Success',
      description: 'Device added!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  const storeChosenDevice = (device: Device) => {
    if (device) {
      localStorage.setItem('device', JSON.stringify(device));
      deviceContext?.setDevicePicked(true);
      openNotification();
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
        alt='device-image'
      />
      <h2>{device.RAM}</h2>
      <h2>{device.price}</h2>
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
