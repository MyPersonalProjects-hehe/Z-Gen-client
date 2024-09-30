import { useContext } from 'react';
import PlanCard from '../../components/home/PlanCard';
import { Plan } from '../../interfaces/plan';
import { AllPlansContext } from '../../context/PlanContext';

function Plans() {
  const allPlans = useContext(AllPlansContext);
  return (
    <div className='plan__cards'>
      {allPlans?.plans.map((plan: Plan) => (
        <div key={plan._id}>
          <PlanCard plan={plan}></PlanCard>
        </div>
      ))}
    </div>
  );
}

export default Plans;
