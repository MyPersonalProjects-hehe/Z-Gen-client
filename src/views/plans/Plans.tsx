import { useEffect, useState } from 'react';
import PlanCard from '../../components/home/PlanCard';
import { Plan } from '../../interfaces/plan';
import axios from 'axios';
import { SERVER_URL } from '../../constants/ServerURL';
import { Segmented } from 'antd';
import './plans.scss';

function Plans() {
  const [allPlans, setAllPlans] = useState([]);
  /**
   false is for regular plans
   true is for corporate plans
   */
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await axios.get(SERVER_URL('allPlans'));
        const sortedPlans = result.data.message.sort(
          (planA: Plan, planB: Plan) =>
            Number(planA.price) - Number(planB.price)
        );

        if (toggle) {
          const corporate = sortedPlans.filter(
            (plan: Plan) => plan.typeOfPlan === 'corporate'
          );
          setAllPlans(corporate || []);
        } else {
          const corporate = sortedPlans.filter(
            (plan: Plan) => plan.typeOfPlan === 'regular'
          );
          setAllPlans(corporate || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPlans();
  }, [toggle]);

  return (
    <div className='plan-body'>
      <div className='toggle__button'>
        <Segmented
          onChange={() => setToggle((prev) => !prev)}
          options={['Regular', 'Corporate']}
          size='large'
          className='toggle'
        />
      </div>
      <div className='plans'>
        {allPlans?.map((plan: Plan) => (
          <div key={plan._id}>
            <PlanCard
              plan={plan}
              isCorporate={toggle}
            ></PlanCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
