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

  return (
    <div className='characteristics-body'>
      <h1>{mainInfo?.model}</h1>
      <CarouselComponent device={mainInfo} />
      <h1>Best Offers:</h1>
      <div className='best__plans'>
        <PlanCard
          isCorporate={false}
          plan={bestPlan}
        ></PlanCard>
        <PlanCard
          isCorporate={false}
          plan={bestPlan}
        ></PlanCard>
      </div>

      <div className='full__characteristics'>
        <h1>Characteristics</h1>
        <h2>
          Main camera: <span> {fullInfo?.camera}</span>
        </h2>
        <h2>
          Selfie camera/Front camera: <span> {fullInfo?.selfieCamera}</span>
        </h2>
        <h2>
          Operation system: <span> {fullInfo?.operationSystem}</span>
        </h2>
        <h2>
          Battery: <span> {fullInfo?.batteryCapacity}</span>
        </h2>
        <h2>
          Corpus: <span> {fullInfo?.corpus}</span>
        </h2>
        <h2>
          Processor: <span> {fullInfo?.processor}</span>
        </h2>
        <h2>
          Functions: <span> {fullInfo?.functions}</span>
        </h2>
        <h2>
          Water proof: <span> {fullInfo?.waterProof}</span>
        </h2>
        <h2>
          Weight: <span> {fullInfo?.weight}</span>
        </h2>
      </div>
    </div>
  );
}

export default CharacteristicsPage;
