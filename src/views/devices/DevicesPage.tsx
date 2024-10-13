import './devices-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { ConfigProvider } from 'antd';
import yellowImage from '../../assets/devices-page-yellow-image.png';
import purpleImage from '../../assets/devices-page-image.png';
import MenuComponent from '../../components/devices/Menu';
import DeviceCard from '../../components/devices/DeviceCard';

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

        <div className='devices-body'>
          <div className='menu'>
            <MenuComponent setSelectedFilterValue={setSelectedFilterValue} />
          </div>

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
