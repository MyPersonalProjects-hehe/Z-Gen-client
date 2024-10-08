import { useParams } from 'react-router-dom';
import './sign-contract.scss';
import { useEffect, useState } from 'react';
import PlanCard from '../../components/home/PlanCard';
import axios from 'axios';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';

function SingContract() {
  const { contractId } = useParams();
  const [planCard, setPlanCard] = useState<Plan | null>(null);
  const deviceData = localStorage.getItem('device');
  const device = deviceData ? JSON.parse(deviceData) : null;
  console.log(device);

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        const response = await axios.get(
          `${SERVER_URL(`fetchPlan/${contractId}`)}`,
          { withCredentials: true }
        );
        setPlanCard(response.data.plan);
      };

      fetchPlan();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='sign-contract-body'>
      <div className='chosen__plan'>
        <h2>Chosen plan</h2>
        <PlanCard
          plan={planCard}
          isCorporate={planCard?.typeOfPlan === 'corporate'}
        />
      </div>
      <div className='chosen__device'>
        <h2>Device:</h2>
        <div
          className={
            planCard?.typeOfPlan === 'corporate'
              ? 'device-corporate style-wrapper'
              : 'device-regular style-wrapper'
          }
        >
          <div className='glass-effect-wrapper'>
            {device ? (
              <div>
                <h1>{device.model}</h1>
                <h1>{device.RAM}</h1>
                <h1>{device.price}</h1>
              </div>
            ) : (
              <h2 className='device-info'>
                You have not picked a device yet. If you wish to continue
                anyway, during the contract length you will not be able to pick
                a device with the discount provided.
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingContract;
