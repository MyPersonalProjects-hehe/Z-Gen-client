import './plan-card.scss';
import { Badge, Button } from 'antd';
import { Plan } from '../../interfaces/plan';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

interface PlanCardProps {
  plan: Plan | null;
  isCorporate: boolean;
}
function PlanCard({ plan, isCorporate }: PlanCardProps) {
  const navigate = useNavigate();
  const userObject = useContext(UserContext);

  const navigateToSignContract = (planId: any) => {
    if (!userObject?.user) {
      navigate('/login');
    } else {
      navigate(`/signContract/${planId}`);
    }
  };

  return (
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
        <h2 className='name-of-plan'>{plan?.nameOfPlan}</h2>
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
          Price: {plan?.price} <EuroCircleOutlined className='euro-icon' />
        </h3>
        <Button
          onClick={() => navigateToSignContract(plan?._id)}
          ghost
          className='btn__learn__more'
        >
          Choose Plan
        </Button>
      </div>
    </div>
  );
}

export default PlanCard;
