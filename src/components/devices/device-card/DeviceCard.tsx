import './device-card.scss';
import { Button } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../../interfaces/device';
import { DeviceContext } from '../../../context/PickedDeviceContext';

interface DeviceProp {
  device: Device;
}

function DeviceCard({ device }: DeviceProp) {
  const deviceContext = useContext(DeviceContext);
  const navigate = useNavigate();

  const storeChosenDevice = (device: Device) => {
    if (device) {
      localStorage.setItem('device', JSON.stringify(device));
      deviceContext?.setDevicePicked(true);
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
