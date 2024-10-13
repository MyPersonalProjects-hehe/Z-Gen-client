import './carousel.scss';
import { EuroCircleOutlined } from '@ant-design/icons';
import { Device } from '../../interfaces/device';
import { Carousel, ConfigProvider, Image } from 'antd';

interface DeviceProp {
  device: Device | null;
}

function CarouselComponent({ device }: DeviceProp) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 50,
          },
        },
      }}
    >
      <div className='carousel-body'>
        <div className='model-info'>
          <h2>RAM {device?.RAM}</h2>
          <h2>
            Regular price: {device?.price}{' '}
            <EuroCircleOutlined
              className='euro'
              color='black'
            />
          </h2>
        </div>

        <div className='carousel'>
          <Carousel
            autoplay
            arrows={true}
          >
            <Image
              className='image'
              src={device?.mainImage}
              alt='device-image'
            />

            <Image
              className='image'
              src={device?.secondImage}
              alt='device-image'
            />

            <Image
              className='image'
              src={device?.thirdImage}
              alt='device-image'
            />
          </Carousel>
        </div>
        <div className='mini-images'>
          <img
            src={device?.mainImage}
            alt='mini-image'
          />
          <img
            src={device?.secondImage}
            alt='mini-image'
          />
          <img
            src={device?.thirdImage}
            alt='mini-image'
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default CarouselComponent;
