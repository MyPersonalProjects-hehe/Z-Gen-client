import './plan-card.scss';
import { Badge, Button, ConfigProvider } from 'antd';
import { Plan } from '../../interfaces/plan';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';

interface PlanCardProps {
  plan: Plan | null;
  isCorporate: boolean;
  isPickedFromChar?: boolean;
  device?: Device | null;
}
function PlanCard({
  plan,
  isCorporate,
  isPickedFromChar,
  device,
}: PlanCardProps) {
  const navigate = useNavigate();
  const userObject = useContext(UserContext);
  const deviceContext = useContext(DeviceContext);

  const navigateToSignContract = (planId: any) => {
    if (!userObject?.user) {
      navigate('/login');
    } else if (userObject?.user && isPickedFromChar) {
      localStorage.setItem('device', JSON.stringify(device));
      deviceContext?.setDevicePicked((prev: boolean) => !prev);
      navigate(`/signContract/${planId}`);
    } else {
      navigate(`/signContract/${planId}`);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'white',
        },
      }}
    >
      <div
        className={
          isCorporate
            ? `plan__card__corporate style-wrapper`
            : `plan__card style-wrapper`
        }
      >
        <div
          className='glass glass-effect-wrapper'
          key={plan?._id}
        >
          <h2 className='transparent-text'>{plan?.nameOfPlan}</h2>
          <h3>{plan?.cards}</h3>
          <div className='content'>
            <h3>
              {isNaN(plan?.minutesInBG)
                ? `Unlimited calls`
                : `Minutes: ${plan?.minutesInBG}`}
            </h3>{' '}
            <h3>{isNaN(plan?.MB) ? `Unlimited MB` : `MB: ${plan?.MB}`}</h3>
            <h3> MBps: {plan?.MBps}</h3>
            <h3> {plan?.minutesInEU || ''}</h3>
            <div className='ribbon'>
              <Badge.Ribbon
                text='Special'
                color='#7462ff'
              ></Badge.Ribbon>
            </div>
            <h3>
              Discount for device: {plan?.discountForDevice}
              <EuroCircleOutlined className='euro-icon' />
            </h3>
          </div>
          <h3>
            Price: {plan?.price}
            <EuroCircleOutlined className='euro-icon' /> -{' '}
            {(Number(plan?.price) - 4).toFixed(2)}
            <EuroCircleOutlined className='euro-icon' />
          </h3>
          <Button
            onClick={() => navigateToSignContract(plan?._id)}
            ghost
            className='btn-choose-plan btn'
          >
            Choose Plan
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default PlanCard;
