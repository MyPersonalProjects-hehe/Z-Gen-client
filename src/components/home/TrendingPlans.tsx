import './trending.plans.scss';

function TrendingPlans() {
  return (
    <div className='block'>
      <div className='heading'>
        <h1>OUR BEST PLANS</h1>
      </div>
      <div className='plan__card'>
        <div className='glass'>
          <h1>Gen Loyal Unlimited</h1>
          <div className='content'>
            <h2>
              Unlimited minutes <br /> Unlimited MB
            </h2>{' '}
            <br /> 200 minutes for EU
            <h2>32.99 - 28.99</h2>
            <button className='btn__learn__more'>Learn more</button>
          </div>
        </div>
        <div className='glass'>
          <h1>Gen Loyal Unlimited</h1>
          <div className='content'>
            <h2>
              Unlimited minutes <br /> Unlimited MB
            </h2>{' '}
            <br /> 200 minutes for EU
            <h2>32.99 - 28.99</h2>
          </div>
        </div>
        <div className='glass'>
          <h1>Gen Loyal Unlimited</h1>
          <div className='content'>
            <h2>
              Unlimited minutes <br /> Unlimited MB
            </h2>{' '}
            <br /> 200 minutes for EU
            <h2>32.99 - 28.99</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingPlans;
