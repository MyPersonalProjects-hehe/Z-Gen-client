import './carousel.scss';
import { Device } from '../../interfaces/device';
import { Carousel, ConfigProvider, Image } from 'antd';
import skeletonImage from '../../assets/skeleton.png';

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
            colorBgContainer: 'black',
          },
        },
      }}
    >
      <div className='carousel-body'>
        <div className='carousel'>
          <Carousel
            autoplay
            arrows={true}
          >
            <Image
              src={device?.mainImage}
              alt={skeletonImage}
            />

            <Image
              src={device?.secondImage}
              alt={skeletonImage}
            />

            <Image
              src={device?.thirdImage}
              alt={skeletonImage}
            />
          </Carousel>
        </div>
        <div className='mini__images'>
          <img
            src={device?.mainImage}
            alt={skeletonImage}
          />
          <img
            src={device?.secondImage}
            alt={skeletonImage}
          />
          <img
            src={device?.thirdImage}
            alt={skeletonImage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default CarouselComponent;
