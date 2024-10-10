import { Device } from '../../interfaces/device';
import './carousel.scss';
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
      <div className='carousel'>
        <Carousel
          autoplay
          arrows={true}
        >
          <div className='img'>
            <Image
              src={device?.mainImage}
              alt='device-image'
            />
          </div>
          <div className='img'>
            <Image
              src={device?.secondImage}
              alt='device-image'
            />
          </div>
          <div className='img'>
            <Image
              src={device?.thirdImage}
              alt='device-image'
            />
          </div>
        </Carousel>
      </div>
    </ConfigProvider>
  );
}

export default CarouselComponent;
