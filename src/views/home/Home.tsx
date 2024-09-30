import './home.scss';
import { useContext } from 'react';
import iphoneImage from '../../assets/iphone-image.jpg';
import samsungImage from '../../assets/samsung-image.jpg';
import huaweiImage from '../../assets/huawei-image.jpeg';
import { Button } from 'antd';
import PlanCard from '../../components/home/PlanCard';
import { Plan } from '../../interfaces/plan';
import { AllPlansContext } from '../../context/PlanContext';

function Home() {
  const allPlans = useContext(AllPlansContext);
  const phoneImages: string[] = [iphoneImage, huaweiImage, samsungImage];
  const phoneModels: string[] = [
    'Iphone 15',
    'Huawei Pura 70 ultra',
    'Samsung s24 Ultra',
  ];

  return (
    <div className='body'>
      <div className='phone-models'>
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
              className='btn'
              ghost
            >
              Learn more
            </Button>
          </div>
        ))}
      </div>

      <div className='info-block'>
        <h1>GENERATION`S BEST DECISION</h1>
        <div className='info'>
          <h2>
            We believe we provide the best services. <br /> We are people`s
            choice for better and smarter life by providing the best
            price-performance ratio
          </h2>
        </div>
      </div>
      <div className='plan__cards'>
        {allPlans?.plans.map((plan: Plan) => (
          <div key={plan._id}>
            <PlanCard plan={plan}></PlanCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
