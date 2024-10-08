import './devices.scss';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { Button } from 'antd';
import { DeviceContext } from '../../context/PickedDeviceContext';

function Devices() {
  const [allDevices, setAllDevices] = useState([]);
  const deviceContext = useContext(DeviceContext);

  useEffect(() => {
    try {
      const fetchAllDevices = async () => {
        const response = await axios.get(SERVER_URL('devices'));
        setAllDevices(response.data.devices);
      };
      fetchAllDevices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const storeChosenDevice = (device: Device) => {
    if (device) {
      localStorage.setItem('device', JSON.stringify(device));
      deviceContext?.setDevicePicked(true);
    }
  };

  return (
    <div>
      <div className='image-poster'></div>
      <div className='devices'>
        {allDevices?.map((device: Device) => (
          <div
            className='device'
            key={device._id}
          >
            <img
              src={device.image}
              alt=''
            />
            <h1>{device.model}</h1>
            <h1>{device.RAM}</h1>
            <h1>{device.price}</h1>
            <Button onClick={() => storeChosenDevice(device)}>
              Pick device
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;
