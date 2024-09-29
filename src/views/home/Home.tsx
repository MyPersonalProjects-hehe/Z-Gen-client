import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import iphoneImage from '../../assets/iphone-image.jpg';
import samsungImage from '../../assets/samsung-image.jpg';
import huaweiImage from '../../assets/huawei-image.jpeg';
import TrendingPlans from '../../components/home/TrendingPlans';
import './home.scss';
import { Button } from 'antd';

function Home() {
  const userContext = useContext(UserContext);
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
      <TrendingPlans />
    </div>
  );
}

export default Home;
