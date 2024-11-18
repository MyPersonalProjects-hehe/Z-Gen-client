import './chosen-device.scss';
import { Device } from '../../../interfaces/device';
import { Plan } from '../../../interfaces/plan';
import { EuroCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DeviceProps {
  planCard: Plan | null;
  device: Device | null;
}

function ChosenDevice({ planCard, device }: DeviceProps) {
  const navigate = useNavigate();
  const discount =
    planCard?.discountForDevice && device
      ? device.price - planCard?.discountForDevice
      : 0;
  const checkedDiscount = discount < 0 ? 'Free' : discount;

  return (
    <>
      <h2>Device:</h2>
      <div
        className={
          planCard?.typeOfPlan === 'corporate'
            ? 'device-corporate card-style-wrapper'
            : 'device-regular card-style-wrapper'
        }
      >
        <div className='glass-effect-wrapper '>
          <h1 className='transparent-text'>{device?.model}</h1>
          {device ? (
            <div className='content device-content'>
              <div className='device-image'>
                <img
                  src={device?.mainImage}
                  alt='image'
                />
              </div>
              <h3>{device.RAM}</h3>
              <h3>
                Before discount : {device.price}
                <EuroCircleOutlined className='euro-icon' /> <br />
              </h3>
              <h3>
                After discount : {checkedDiscount}{' '}
                {checkedDiscount !== 'Free' && (
                  <EuroCircleOutlined className='euro-icon' />
                )}
              </h3>
            </div>
          ) : (
            <div className='no-device'>
              <h2>
                You have not picked a device yet. If you wish to continue
                anyway, during the contract you will not be able to pick a
                device.
              </h2>
              <PlusCircleOutlined
                className='plus-icon'
                onClick={() => navigate('/devices')}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChosenDevice;
