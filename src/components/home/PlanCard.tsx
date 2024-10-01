import './plan-card.scss';
import { Badge, Button } from 'antd';
import { Plan } from '../../interfaces/plan';
import { EuroCircleOutlined } from '@ant-design/icons';

interface PlanCardProps {
  plan: Plan;
  isCorporate: boolean;
}
function PlanCard({ plan, isCorporate }: PlanCardProps) {
  return (
    <div className={isCorporate ? `plan__card__corporate` : `plan__card`}>
      <div
        className='glass'
        key={plan._id}
      >
        <h2 className='name-of-plan'>{plan.nameOfPlan}</h2>
        <div className='content'>
          <h3>
            {isNaN(plan.minutesInBG)
              ? `Unlimited calls`
              : `Minutes: ${plan.minutesInBG}`}
          </h3>{' '}
          <h3>{isNaN(plan.MB) ? `Unlimited MB` : `MB: ${plan.MB}`}</h3>
          <h3> MBps: {plan.MBps}</h3>
          <h3> {plan.minutesInEU > 0}</h3>
          <div className='ribbon'>
            <Badge.Ribbon
              text='Special'
              color='var(--c-primary)'
            ></Badge.Ribbon>
          </div>
          <h3>
            Discount for device: {plan.discountForDevice}
            <EuroCircleOutlined className='euro-icon' />
          </h3>
        </div>
        <h3>
          Price: {plan.price} <EuroCircleOutlined className='euro-icon' />
        </h3>
        <Button
          ghost
          className='btn__learn__more'
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}

export default PlanCard;
