import './plans-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Plan } from '../../interfaces/plan';
import { SERVER_URL } from '../../constants/ServerURL';
import { ConfigProvider, Segmented, Spin } from 'antd';
import TermsOfContract from '../../components/plans/terms/TermsOfContract';
import StepsHeading from '../../components/plans/steps/Steps-heading';
import WhyChooseUs from '../../components/plans/why-choose-us/WhyChooseUs';
import PlanCard from '../../components/plans/plan-card/PlanCard';

function PlansPage() {
  const [allPlans, setAllPlans] = useState([]);
  /*false is for regular plans true is for corporate plans*/
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await axios.get(SERVER_URL('allPlans'));
        const sortedPlans = result.data.message.sort(
          (planA: Plan, planB: Plan) =>
            Number(planA.price) - Number(planB.price)
        );

        if (toggle) {
          const filteredPlans = sortedPlans.filter(
            (plan: Plan) => plan.typeOfPlan === 'corporate'
          );
          setAllPlans(filteredPlans || []);
        } else {
          const filteredPlans = sortedPlans.filter(
            (plan: Plan) => plan.typeOfPlan === 'regular'
          );
          setAllPlans(filteredPlans || []);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPlans();
  }, [toggle]);

  return (
    <div className='plan-body'>
      <div className='steps'>
        <h1>Signing contracts was never easier!</h1>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: toggle ? '#3d2450' : '#7462ff',
              fontSize: 15,
            },
          }}
        >
          <StepsHeading />
        </ConfigProvider>
      </div>

      <div className='toggle__button'>
        <Segmented
          onChange={() => setToggle((prev) => !prev)}
          options={['Regular', 'Corporate']}
          size='large'
          className='toggle'
        />
      </div>

      {loading ? (
        <div className='loading__state'>
          <Spin size='large'></Spin>
        </div>
      ) : (
        <div className='plans'>
          {allPlans?.map((plan: Plan) => (
            <div key={plan._id}>
              <PlanCard
                plan={plan}
                isCorporate={toggle}
              />
            </div>
          ))}
        </div>
      )}

      <WhyChooseUs />

      <div className='easy__signing'>
        <h2>Before signing a contract be sure to read our terms of use!</h2>
      </div>
      <div className='terms'>
        <TermsOfContract />
      </div>
    </div>
  );
}

export default PlansPage;
