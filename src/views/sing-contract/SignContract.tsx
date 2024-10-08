import './sign-contract.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlanCard from '../../components/home/PlanCard';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';
import ChosenDevice from '../../components/sing-contract/ChosenDevice';
import { ConfigProvider, Steps } from 'antd';

function SingContract() {
  const { contractId } = useParams();
  const [planCard, setPlanCard] = useState<Plan | null>(null);
  const deviceToken = localStorage.getItem('device');
  const device = deviceToken ? JSON.parse(deviceToken) : null;

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5c4b5b',
        },
      }}
    >
      <div className='sign-contract-body'>
        <div className='progress'>
          <Steps
            current={1}
            items={[
              {
                title: 'Finished',
                description: 'Pick a plan',
              },
              {
                title: device ? 'Finished' : 'In Progress',
                description: 'Pick a device',
              },
              {
                title: 'Waiting',
                description: 'e',
              },
            ]}
          />
        </div>
        <div className='picked__items'>
          <div className='chosen-plan'>
            <h2>Chosen plan</h2>
            <PlanCard
              plan={planCard}
              isCorporate={planCard?.typeOfPlan === 'corporate'}
            />
          </div>
          <div className='chosen-device'>
            <ChosenDevice
              device={device}
              planCard={planCard}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
export default SingContract;
