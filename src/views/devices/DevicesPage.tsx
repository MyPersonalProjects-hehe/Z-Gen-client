import './devices-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { ConfigProvider } from 'antd';
import yellowImage from '../../assets/devices-page-yellow-image.png';
import purpleImage from '../../assets/devices-page-image.png';
import MenuComponent from '../../components/devices/Menu';
import DeviceCard from '../../components/devices/device-card/DeviceCard';

function DevicesPage() {
  const [allDevices, setAllDevices] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
  const [filteredDevices, setFilteredDevices] = useState([]);

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

  /*Menu filtering */
  useEffect(() => {
    if (selectedFilterValue === 'Clear filters') {
      setSelectedFilterValue('');
    }
    const devices = allDevices.filter((device: Device) =>
      device.model.includes(selectedFilterValue)
    );
    setFilteredDevices(devices);
  }, [selectedFilterValue]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2a4e86',
        },
        components: {
          Button: {
            defaultHoverBg: '#2a4e86',
            defaultBg: '#2a4e86',
            defaultColor: 'white',
            defaultHoverColor: 'white',
            defaultActiveBg: '#2a4e86',
          },
        },
      }}
    >
      <div className='devices-body'>
        <div className='poster__images'>
          <img
            src={yellowImage}
            alt='image'
          />
          <img
            src={purpleImage}
            alt='image'
          />
        </div>

        <div className='menu__and__devices'>
          <MenuComponent setSelectedFilterValue={setSelectedFilterValue} />

          {selectedFilterValue ? (
            <div className='devices'>
              {filteredDevices.map((device: Device) => (
                <DeviceCard
                  device={device}
                  key={device._id}
                />
              ))}
            </div>
          ) : (
            <div className='devices'>
              {allDevices?.map((device: Device) => (
                <DeviceCard
                  device={device}
                  key={device._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default DevicesPage;
