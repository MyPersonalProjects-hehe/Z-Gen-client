import './devices-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { ConfigProvider, Spin } from 'antd';
import yellowImage from '../../assets/devices/yellow-image.png';
import purpleImage from '../../assets/devices/purple-image.png';
import MenuComponent from '../../components/devices/menu/Menu';
import DeviceCard from '../../components/devices/device-card/DeviceCard';
import Pagination from '../../components/devices/pagination/Pagination';

function DevicesPage() {
  /**Pagination */
  const [pages, setPages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * 6;
  const indexOfFirst = indexOfLast - 6;
  /**Device fetching/filtering */
  const [allDevices, setAllDevices] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
  const [filteredDevices, setFilteredDevices] = useState([]);
  /**Loading state */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchAllDevices = async () => {
        const response = await axios.get(SERVER_URL('devices'));
        if (response.status === 200) {
          setAllDevices(response.data.devices);
          const arr = Array.from({
            length: Math.ceil(response.data.devices.length / 6),
          });
          setPages(arr);
          setLoading(false);
        }
      };
      fetchAllDevices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  /*Menu filtering */
  useEffect(() => {
    let devices = [...allDevices].reverse();
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
      case 'Accessories':
        devices = devices.filter((device: Device) =>
          device.model.includes('watch')
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

    /**Setting number of pages based on filter value */
    const arr = Array.from({ length: Math.ceil(devices.length / 6) });
    setPages(arr);
  }, [selectedFilterValue, allDevices]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2a4e86',
        },
        components: {
          Button: {
            defaultHoverBg: 'var(--c-third)',
            defaultBg: '#2a4e86',
            defaultColor: 'white',
            defaultHoverColor: 'white',
            defaultActiveBg: '#2a4e86',
            defaultActiveColor: 'white',
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

          <div className='results'>
            {loading ? (
              <div className='loading'>
                <Spin size='large'>Fetching devices please wait!</Spin>
              </div>
            ) : (
              <>
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
                  <Pagination
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default DevicesPage;
