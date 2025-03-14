import './plan-card.scss';
import { Badge, Button, ConfigProvider } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Plan } from '../../../interfaces/plan';
import { Device } from '../../../interfaces/device';
import { UserContext } from '../../../context/UserContext';
import { DeviceContext } from '../../../context/PickedDeviceContext';
import { EligibleUserContext } from '../../../context/EligibleUserContext';

interface PlanCardProps {
  plan: Plan | null;
  isCorporate: boolean;
  isPickedFromChar?: boolean;
  device?: Device | null;
  signContractPage?: boolean;
}

function PlanCard({
  plan,
  isCorporate,
  isPickedFromChar,
  device,
  signContractPage,
}: PlanCardProps) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const deviceContext = useContext(DeviceContext);
  const eligibilityContext = useContext(EligibleUserContext);

  const navigateToSignContract = (planId: any) => {
    if (!userContext?.user) {
      navigate('/signUp');
    } else if (
      userContext?.user &&
      isPickedFromChar &&
      eligibilityContext?.isEligible
    ) {
      localStorage.setItem('device', JSON.stringify(device));
      localStorage.setItem('plan', JSON.stringify(plan?._id));
      deviceContext?.setDevicePicked((prev: boolean) => !prev);
      navigate(`/signContract/${planId}`);
    } else {
      navigate(`/signContract/${planId}`);
      localStorage.setItem('plan', JSON.stringify(plan?._id));
      deviceContext?.setDevicePicked((prev: boolean) => !prev);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'white',
        },
        components: {
          Badge: {
            fontSize: 15,
          },
        },
      }}
    >
      <div
        className={
          isCorporate
            ? `plan-card-corporate card-style-wrapper`
            : `plan-card card-style-wrapper`
        }
      >
        <div className='glass glass-effect-wrapper'>
          <h2 className='text-card-style-wrapper'>{plan?.nameOfPlan}</h2>
          <div className='content'>
            <h3>
              {isNaN(plan?.minutesInBG)
                ? `Unlimited calls`
                : `Minutes: ${plan?.minutesInBG}`}
            </h3>{' '}
            <h3>{isNaN(plan?.MB) ? `Unlimited MB` : `MB: ${plan?.MB}`}</h3>
            <h3> MBps : {plan?.MBps}</h3>
            <h3>
              {' '}
              {plan?.minutesInEU ? `Minutes in EU : ${plan.minutesInEU}` : ''}
            </h3>
            <div className='ribbon'>
              <Badge.Ribbon
                text='Special'
                color='#7462ff'
              ></Badge.Ribbon>
            </div>
            <h3>
              Discount for device : {plan?.discountForDevice}
              <EuroCircleOutlined className='euro-icon' />
            </h3>
          </div>
          <h3 className='price'>
            Price : {plan?.price}
            <EuroCircleOutlined className='euro-icon' /> -{' '}
            {(Number(plan?.price) - 4).toFixed(2)}
            <EuroCircleOutlined className='euro-icon' />
          </h3>
          {!signContractPage && (
            <Button
              onClick={() => navigateToSignContract(plan?._id)}
              ghost
              className='btn-choose-plan btn'
            >
              Choose Plan
            </Button>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default PlanCard;
