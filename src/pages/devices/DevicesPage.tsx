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
  const [pages, setPages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * 4;
  const indexOfFirst = indexOfLast - 4;
  const [allDevices, setAllDevices] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    try {
      const fetchAllDevices = async () => {
        const response = await axios.get(SERVER_URL('devices'));
        setAllDevices(response.data.devices);
        const arr = Array.from({
          length: Math.ceil(response.data.devices.length / 4),
        });
        setPages(arr);
      };
      fetchAllDevices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  /*Menu filtering */
  useEffect(() => {
    let devices = [...allDevices];
    setCurrentPage(1);
    switch (selectedFilterValue) {
      case 'Clear filters':
        setFilteredDevices(devices);
        setSelectedFilterValue('');
        break;
      case 'Price':
        devices = devices.sort(
          (deviceA: Device, deviceB: Device) =>
            Number(deviceA.price) - Number(deviceB.price)
        );
        setFilteredDevices(devices);
        break;
      case 'RAM memory':
        devices = devices.sort(
          (deviceA: Device, deviceB: Device) =>
            Number(deviceB.RAM.split('/')[0]) -
            Number(deviceA.RAM.split('/')[0])
        );
        setFilteredDevices(devices);
        break;
      default:
        devices = devices.filter((device: Device) =>
          device.model.includes(selectedFilterValue)
        );
        setFilteredDevices(devices);
        break;
    }

    const arr = Array.from({ length: Math.ceil(devices.length / 4) });
    setPages(arr);
  }, [selectedFilterValue, allDevices]);

  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <div className='menu'>
            <MenuComponent setSelectedFilterValue={setSelectedFilterValue} />
          </div>

          {selectedFilterValue ? (
            <div className='results'>
              <div className='devices'>
                {[...filteredDevices]
                  .slice(indexOfFirst, indexOfLast)
                  .map((device: Device) => (
                    <DeviceCard
                      device={device}
                      key={device._id}
                    />
                  ))}
              </div>
              <div className='paginate-numbers'>
                {pages.map((_, index) => (
                  <span
                    onClick={() => handlePaginate(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className='results'>
              <div className='devices'>
                {[...allDevices]
                  .slice(indexOfFirst, indexOfLast)
                  ?.map((device: Device) => (
                    <DeviceCard
                      device={device}
                      key={device._id}
                    />
                  ))}
              </div>
              <div className='paginate-numbers'>
                {pages.map((_, index) => (
                  <span
                    onClick={() => handlePaginate(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default DevicesPage;
