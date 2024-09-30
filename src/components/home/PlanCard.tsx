import './plan-card.scss';
import { Button } from 'antd';
import { Plan } from '../../interfaces/plan';

interface PlanCardProps {
  plan: Plan;
}
function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className='trending-plans'>
      <div className='heading'>
        <h2>OUR BEST PLANS</h2>
      </div>
      <div className='plan__cards'>
        <div
          className='glass'
          key={plan._id}
        >
          <h2>{plan.nameOfPlan}</h2>
          <div className='content'>
            <h3>
              {plan.minutesInBG},{plan.MB}, {plan.minutesInEU}, {plan.price}
            </h3>
            <Button
              ghost
              className='btn__learn__more'
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
