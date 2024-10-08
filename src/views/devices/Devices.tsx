import './devices.scss';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { Button, ConfigProvider } from 'antd';
import { DeviceContext } from '../../context/PickedDeviceContext';
import yellowImage from '../../assets/devices-page-yellow-image.png';
import purpleImage from '../../assets/devices-page-image.png';

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#230565',
        },
      }}
    >
      <div>
        <div className='images-poster'>
          <img
            src={yellowImage}
            alt='image'
          />
          <img
            src={purpleImage}
            alt='image'
          />
        </div>

        <div className='devices'>
          {allDevices?.map((device: Device) => (
            <div
              className='device'
              key={device._id}
            >
              <h2>{device.model}</h2>
              <img
                src={device.image}
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
                <Button className='btn'>Characteristics</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Devices;
