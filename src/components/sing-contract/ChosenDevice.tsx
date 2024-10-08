import './chosen-device.scss';
import { Device } from '../../interfaces/device';
import { Plan } from '../../interfaces/plan';
import { EuroCircleOutlined } from '@ant-design/icons';

interface DeviceProps {
  planCard: Plan | null;
  device: Device;
}

function ChosenDevice({ planCard, device }: DeviceProps) {
  return (
    <>
      <h2>Device:</h2>
      <div
        className={
          planCard?.typeOfPlan === 'corporate'
            ? 'device-corporate style-wrapper'
            : 'device-regular style-wrapper'
        }
      >
        <div className='glass-effect-wrapper '>
          <h1 className='transparent-text'>{device?.model}</h1>
          {device ? (
            <div className='content device-content'>
              <div className='device-image'>
                <img
                  src={device.image}
                  alt=''
                />
              </div>
              <h3>{device.RAM}</h3>
              <h3>
                Before discount : {device.price}
                <EuroCircleOutlined className='euro-icon' /> <br />
              </h3>
              <h3>
                After discount :{' '}
                {planCard?.discountForDevice
                  ? device.price - planCard?.discountForDevice
                  : 0}{' '}
                <EuroCircleOutlined className='euro-icon' /> <br />
              </h3>
            </div>
          ) : (
            <h2 className='device-info'>
              You have not picked a device yet. If you wish to continue anyway,
              during the contract length you will not be able to pick a device
              with the discount provided.
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ChosenDevice;
