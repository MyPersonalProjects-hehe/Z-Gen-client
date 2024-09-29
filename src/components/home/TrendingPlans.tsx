import { Button } from 'antd';
import './trending.plans.scss';

function TrendingPlans() {
  return (
    <div className='trending-plans'>
      <div className='heading'>
        <h2>OUR BEST PLANS</h2>
      </div>
      <div className='plan__cards'>
        <div className='glass'>
          <h2>Gen Loyal Unlimited</h2>
          <div className='content'>
            <h3>
              Unlimited minutes <br /> Unlimited MB
            </h3>{' '}
            <br /> 200 minutes for EU
            <h3>32.99 - 28.99</h3>
            <Button
              ghost
              className='btn__learn__more'
            >
              Learn more
            </Button>
          </div>
        </div>
        <div className='glass'>
          <h2>Gen Loyal Unlimited</h2>
          <div className='content'>
            <h3>
              Unlimited minutes <br /> Unlimited MB
            </h3>{' '}
            <br /> 200 minutes for EU
            <h3>32.99 - 28.99</h3>
          </div>
        </div>
        <div className='glass'>
          <h2>Gen Loyal Unlimited</h2>
          <div className='content'>
            <h3>
              Unlimited minutes <br /> Unlimited MB
            </h3>{' '}
            <br /> 200 minutes for EU
            <h3>32.99 - 28.99</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingPlans;
