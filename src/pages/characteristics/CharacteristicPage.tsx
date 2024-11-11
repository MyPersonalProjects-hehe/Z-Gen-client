import './characteristics-page.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CarouselComponent from '../../components/characteristics/Carousel';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Device } from '../../interfaces/device';
import { DeviceFullInfo } from '../../interfaces/deviceCharacteristics';
import { Plan } from '../../interfaces/plan';

import {
  Badge,
  Button,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Skeleton,
} from 'antd';
import {
  CarOutlined,
  ClockCircleOutlined,
  EuroCircleOutlined,
  PercentageOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import PlanCard from '../../components/plans/plan-card/PlanCard';

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
      span: 1,
    },
    {
      key: '2',
      label: 'RAM',
      children: mainInfo?.RAM,
      span: 1,
    },
    {
      key: '3',
      label: 'Water proof',
      children: fullInfo?.waterProof,
      span: 1,
    },
    {
      key: '4',
      label: 'Selfie camera',
      children: fullInfo?.selfieCamera,
      span: 1,
    },
    {
      key: '5',
      label: 'Main camera',
      children: fullInfo?.camera,
      span: 2,
    },
    {
      key: '6',
      label: 'Processor',
      children: fullInfo?.processor,
      span: 3,
    },
    {
      key: '7',
      label: 'Battery',
      children: fullInfo?.batteryCapacity,
      span: 1,
    },
    {
      key: '8',
      label: 'Operation system',
      children: fullInfo?.operationSystem,
      span: 1,
    },
    {
      key: '9',
      label: 'Weight',
      children: fullInfo?.weight,
      span: 1,
    },
    {
      key: '10',
      label: 'Functions',
      children: fullInfo?.functions,
      span: 3,
    },
  ];

  return (
    <div className='characteristics-body'>
      <h1 className='offer-heading'>Our offer</h1>

      <div className='model__info'>
        {!mainInfo ? (
          <Skeleton.Image
            active={true}
            className='skeleton'
          />
        ) : (
          <div className='carousel__component'>
            <CarouselComponent device={mainInfo} />
            {bestPlan?.discountForDevice && (
              <h1>
                {mainInfo.price - bestPlan.discountForDevice < 0 ? (
                  'Free!'
                ) : (
                  <>
                    After discount:{' '}
                    {mainInfo.price - bestPlan.discountForDevice}{' '}
                    <EuroCircleOutlined />
                    <Button
                      onClick={() =>
                        localStorage.setItem(
                          'device',
                          JSON.stringify(mainInfo.model)
                        )
                      }
                      type='primary'
                      className='btn'
                    >
                      Pick device
                    </Button>
                  </>
                )}
              </h1>
            )}
          </div>
        )}
        <div className='info__blocks'>
          <h1 className='headings-char-page'>{mainInfo?.model}</h1>
          <span className='block'>
            <CarOutlined style={{ fontSize: 25 }} />
            <p>Free delivery!</p>
          </span>
          <span className='block relative'>
            <Badge.Ribbon
              text='Fast delivery'
              color='var(--c-third)'
              className='ribbon'
            />
            <ClockCircleOutlined style={{ fontSize: 25 }} />
            <p>Delivery time is between 5 to 15 work days</p>
          </span>
          <span className='block'>
            <PercentageOutlined style={{ fontSize: 25 }} />
            <p>
              Every device has a 10% discount from its regular price. We are the
              first and only providers who offers two types of discount!
            </p>
          </span>
          <span className='block'>
            <SafetyCertificateOutlined style={{ fontSize: 25 }} />
            <p>24 months warranty with the option for 1 year extension!</p>
          </span>
        </div>

        <div className='best__plan'>
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
              colorTextSecondary: 'var(--c-primary)',
            },
          },
        }}
      >
        <div className='characteristics'>
          <h2>Characteristics</h2>
          <Descriptions
            layout='vertical'
            bordered
            items={items}
            className='table'
            column={3}
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CharacteristicsPage;
