import './characteristics-page.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CarouselComponent from '../../components/characteristics/Carousel';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { DeviceFullInfo } from '../../interfaces/deviceCharacteristics';
import PlanCard from '../../components/home/PlanCard';
import { Plan } from '../../interfaces/plan';
import {
  Badge,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Skeleton,
} from 'antd';
import { CarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import poster from '../../assets/charac-page-poster.png';

function CharacteristicsPage() {
  const { deviceId } = useParams();
  /*main device info */
  const [mainInfo, setMainInfo] = useState<Device | null>(null);
  /*full characteristics device info */
  const [fullInfo, setFullInfo] = useState<DeviceFullInfo | null>(null);
  /*plan with the biggest discount for device */
  const [bestPlan, setBestPlan] = useState<Plan | null>(null);

  useEffect(() => {
    try {
      const fetchDeviceInfo = async () => {
        const responseOne = await axios.get(
          SERVER_URL(`getDeviceById/${deviceId}`)
        );
        const responseTwo = await axios.get(
          SERVER_URL(`fetchFullInfo/${responseOne.data.device.model}`)
        );
        const fetchPlan = await axios.get(SERVER_URL('bestPlan'));

        setMainInfo(responseOne.data.device);
        setFullInfo(responseTwo.data.info[0]);
        setBestPlan(fetchPlan.data.plan);
      };
      fetchDeviceInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**Model characteristics */
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Product',
      children: mainInfo?.model,
    },
    {
      key: '2',
      label: 'RAM',
      children: mainInfo?.RAM,
    },
    {
      key: '3',
      label: 'Water proof',
      children: fullInfo?.waterProof,
    },
    {
      key: '4',
      label: 'Selfie camera',
      children: fullInfo?.selfieCamera,
    },
    {
      key: '5',
      label: 'Main camera',
      span: 2,
      children: fullInfo?.camera,
    },
    {
      key: '6',
      label: 'Processor',
      span: 3,
      children: fullInfo?.processor,
    },
    {
      key: '7',
      label: 'Battery',
      children: fullInfo?.batteryCapacity,
    },
    {
      key: '8',
      label: 'Operation system',
      children: fullInfo?.operationSystem,
    },
    {
      key: '9',
      label: 'Weight',
      children: fullInfo?.weight,
    },
    {
      key: '10',
      label: 'Functions',
      children: fullInfo?.functions,
    },
  ];

  return (
    <div className='characteristics-body'>
      <div className='poster'>
        <h2>We make life more stylish every contract at a time</h2>
        <img
          src={poster}
          alt='poster'
        />
      </div>
      <div className='model__info'>
        {!mainInfo ? (
          <Skeleton.Image
            active={true}
            className='skeleton'
          />
        ) : (
          <CarouselComponent device={mainInfo} />
        )}
        <div className='info__block'>
          <h1>{mainInfo?.model}</h1>
          <span className='line dot'>
            <Badge
              color='green'
              text='in stock'
              style={{ fontWeight: 700 }}
            />
          </span>

          <span className='line delivery'>
            <CarOutlined style={{ fontSize: 25 }} />
            <p>Free delivery!</p>
            <ClockCircleOutlined style={{ fontSize: 25 }} />
            <p>Delivery time is between 5 to 15 work days</p>

            <Badge.Ribbon
              text='Fast delivery'
              color='var(--c-third)'
              className='ribbon'
            />
          </span>
          <h2>sdasd</h2>
          <h2>sdasd</h2>
          <h2>sdasd</h2>
          <h2>sdasd</h2>
        </div>

        <div className='best__plan'>
          <h2 className='headings-char-page'>Our offer</h2>
          <PlanCard
            isCorporate={false}
            plan={bestPlan}
            isPickedFromChar={true}
            device={mainInfo}
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 25,
          },
          components: {
            Descriptions: {
              colorTextSecondary: 'var(--c-third)',
            },
          },
        }}
      >
        <div className='characteristics'>
          <h2 className='headings-char-page'>Characteristics</h2>
          <Descriptions
            layout='vertical'
            bordered
            items={items}
            className='table'
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CharacteristicsPage;
