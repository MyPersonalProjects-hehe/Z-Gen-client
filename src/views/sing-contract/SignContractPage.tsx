import './sign-contract-page.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlanCard from '../../components/home/PlanCard';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';
import ChosenDevice from '../../components/sing-contract/ChosenDevice';
import { ConfigProvider, Steps } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';

function SingContractPage() {
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
                icon: <CheckCircleOutlined />,
              },
              {
                title: device ? 'Finished' : 'In Progress',
                description: 'Pick a device',
                icon: device ? (
                  <CheckCircleOutlined />
                ) : (
                  <ExclamationCircleOutlined />
                ),
              },
              {
                title: 'Waiting',
                description: 'e',
                icon: <ExclamationCircleOutlined />,
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
          <PlusCircleOutlined className='plus-icon' />
          <div className='chosen-device'>
            <ChosenDevice planCard={planCard} />
          </div>
        </div>
        <div className='text-block'>
          <SmileOutlined className='smile-icon' />
          <h2 className='heading'>
            For best experience, all contracts have trial period of 14 days!
          </h2>
          <h2>
            If you are not delighted with our contract you can visit the nearest
            shop and declare a contract cancelation. The cancelation is
            considered for processing of how we can improve our services.
          </h2>
        </div>
      </div>
    </ConfigProvider>
  );
}
export default SingContractPage;
