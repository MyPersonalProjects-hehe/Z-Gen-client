import './devices-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { ConfigProvider } from 'antd';
import yellowImage from '../../assets/devices/yellow-image.png';
import purpleImage from '../../assets/devices/purple-image.png';
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
      setFilteredDevices([...allDevices]);
      setSelectedFilterValue('');
    } else if (selectedFilterValue === 'Price') {
      const devices = [...allDevices].sort(
        (deviceA: Device, deviceB: Device) =>
          Number(deviceA.price) - Number(deviceB.price)
      );
      setFilteredDevices(devices);
    } else if (selectedFilterValue === 'RAM memory') {
      const devices = [...allDevices].sort(
        (deviceA: Device, deviceB: Device) =>
          Number(deviceB.RAM.split('/')[0]) - Number(deviceA.RAM.split('/')[0])
      );
      setFilteredDevices(devices);
    } else {
      const devices = allDevices.filter((device: Device) =>
        device.model.includes(selectedFilterValue)
      );
      setFilteredDevices(devices);
    }
  }, [selectedFilterValue, allDevices]);

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
