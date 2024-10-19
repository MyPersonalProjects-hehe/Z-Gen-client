import axios from 'axios';
import './home-page.scss';
import { useEffect, useState } from 'react';
import iphoneImage from '../../assets/iphone-image.jpg';
import samsungImage from '../../assets/samsung-image.jpg';
import huaweiImage from '../../assets/huawei-image.jpeg';
import { Button, ConfigProvider } from 'antd';
import PlanCard from '../../components/home/PlanCard';
import { Plan } from '../../interfaces/plan';
import { SERVER_URL } from '../../constants/ServerURL';
import poster from '../../assets/charac-page-poster.png';
import {
  CarOutlined,
  CreditCardOutlined,
  FilePdfOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

function HomePage() {
  const [plans, setPlans] = useState([]);
  const phoneImages: string[] = [iphoneImage, huaweiImage, samsungImage];
  const phoneModels: string[] = [
    'Iphone 15',
    'Huawei Pura 70 ultra',
    'Samsung s24 Ultra',
  ];

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await axios.get(SERVER_URL('allPlans'));
        const sortedPlans = result.data.message.sort(
          (planA: Plan, planB: Plan) =>
            Number(planA.price) - Number(planB.price)
        );
        setPlans(sortedPlans || []);
      } catch (error) {}
    };

    fetchAllPlans();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'white',
        },
      }}
    >
      <div className='body'>
        <div className='poster'>
          <h2 className='text-style-wrapper'>
            We make life more stylish every contract at a time
          </h2>
          <img
            src={poster}
            alt='poster'
          />
        </div>
        <div className='phone__models'>
          {phoneImages.map((image, index) => (
            <div
              className='phone__block'
              key={index}
            >
              <h1>{phoneModels[index]}</h1>
              <img
                src={image}
                alt={phoneModels[index]}
              />

              <Button
                className='btn btn-home'
                ghost
              >
                Learn more
              </Button>
            </div>
          ))}
        </div>

        <h1>GENERATION`S BEST DECISION</h1>

        <div className='services'>
          <h2 className='text-style-wrapper'>
            We believe we provide the best services <br /> We are people`s
            choice for better and smarter life by providing the best
            price-performance ratio
          </h2>
          <div className='mini__blocks'>
            <span>
              <FilePdfOutlined /> E-signing
            </span>
            <span>
              <CarOutlined className='span-icon' /> Fast device delivery
            </span>
            <span>
              <PercentageOutlined /> Special discounts
            </span>
            <span>
              <CreditCardOutlined /> Online payments
            </span>
          </div>
        </div>

        <div className='plan__cards'>
          {plans?.map((plan: Plan) => (
            <div key={plan._id}>
              <PlanCard
                plan={plan}
                isCorporate={false}
              />
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default HomePage;
