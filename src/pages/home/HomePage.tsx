import './home-page.scss';
import axios from 'axios';
import iphoneImage from '../../assets/home/iphone-image.jpg';
import samsungImage from '../../assets/home/samsung-image.jpg';
import huaweiImage from '../../assets/home/huawei-image.jpeg';
import { Button, ConfigProvider, Spin } from 'antd';
import { SERVER_URL } from '../../constants/ServerURL';
import transparentImg from '../../assets/home/transparent-img.png';
import {
  CarOutlined,
  FilePdfOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import corporate from '../../assets/home/corporate.jpg';
import { useState } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const phoneImages: string[] = [iphoneImage, huaweiImage, samsungImage];
  const phoneModels: string[] = [
    'Iphone 15',
    'Huawei Pura 70 ultra',
    'Samsung s24 ultra',
  ];

  const fetchDeviceModel = async (model: string) => {
    try {
      setLoading(true);
      const result = await axios.get(SERVER_URL(`device/${model}`));
      const modelId = result.data.device[0]._id;
      setLoading(false);
      navigate(`/characteristics/${modelId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'white',
        },
        components: {
          Spin: {
            colorPrimary: '#2a4e86',
          },
        },
      }}
    >
      <div className='body'>
        <div className='poster'>
          <h1 className='text-style-wrapper'>
            We make life more stylish every contract at a time
          </h1>
          <img
            src={transparentImg}
            alt='poster'
          />
        </div>
        {!loading ? (
          <div className='loading'>
            <Spin size='large'>Loading device models please wait!</Spin>
          </div>
        ) : (
          <>
            <div className='phone__models'>
              {phoneImages.map((image, index) => (
                <div
                  className='phone'
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
                    onClick={() => fetchDeviceModel(phoneModels[index])}
                  >
                    Learn more
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        <h1>GENERATION`S BEST DECISION</h1>

        <div className='services'>
          <h2>
            We believe we provide the best services <br /> We are people`s
            choice for better and smarter life by providing the best
            price-performance ratio
          </h2>
          <div className='mini__blocks'>
            <span>
              <FilePdfOutlined /> E-signing
            </span>
            <span>
              <CarOutlined className='span-icon' /> Fast delivery
            </span>
            <span>
              <PercentageOutlined /> Special discounts
            </span>
          </div>
        </div>

        <div className='trusted__telecom'>
          <img
            src={corporate}
            alt=''
          />
          <h2>
            At ZGen, we are proud to be a trusted telecom provider for leading
            companies worldwide. <br />
            Our commitment to innovation and reliability has made us the partner
            of choice for enterprises seeking seamless, high-speed connectivity.
          </h2>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default HomePage;
