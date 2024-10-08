import './devices.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { Button } from 'antd';

function Devices() {
  const [allDevices, setAllDevices] = useState([]);

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
      console.log('yes');
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
