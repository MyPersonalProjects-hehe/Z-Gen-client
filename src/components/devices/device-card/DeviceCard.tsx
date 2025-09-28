import './device-card.scss';
import { Button, notification } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../../interfaces/device';
import { DeviceContext } from '../../../context/PickedDeviceContext';
import {
  EuroCircleOutlined,
  SmileOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { UserContext } from '../../../context/UserContext';
import skeletonImage from '../../../assets/skeleton.png';
import { EligibleUserContext } from '../../../context/EligibleUserContext';
import { storeChosenDevice } from '../../../helpers/store-device/storeDevice';

interface DeviceProp {
  device: Device;
}

function DeviceCard({ device }: DeviceProp) {
  const navigate = useNavigate();
  const deviceContext = useContext(DeviceContext);
  const userContext = useContext(UserContext);
  const eligibilityContext = useContext(EligibleUserContext);
  const [api, contextHolder] = notification.useNotification();

  const navigateToCharacteristics = (deviceId: any) => {
    navigate(`/characteristics/${deviceId}`);
  };

  return (
    <div
      className='device'
      key={device._id}
    >
      {contextHolder}
      <h2>{device.model}</h2>
      <img
        src={device.mainImage || skeletonImage}
        alt={skeletonImage}
      />
      <h3>{device.RAM}</h3>
      <h2 className='price'>
        {device.price} <EuroCircleOutlined />{' '}
      </h2>
      <div className='buttons'>
        <Button
          className='btn'
          onClick={() =>
            storeChosenDevice({
              api: api,
              device: device,
              deviceContext: deviceContext,
              eligibilityContext: eligibilityContext,
              iconError: <WarningOutlined />,
              iconSuccess: <SmileOutlined />,
              userContext: userContext,
              bestPlanId: '',
              navigate: navigate,
            })
          }
        >
          Add to cart
        </Button>
        <Button
          className='btn'
          onClick={() => navigateToCharacteristics(device._id)}
        >
          Characteristics
        </Button>
      </div>
    </div>
  );
}

export default DeviceCard;
