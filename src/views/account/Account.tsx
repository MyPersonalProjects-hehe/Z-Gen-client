import './account.scss';
import { Progress } from 'antd';
import pngImage from '../../assets/account/account-page.png';
import {
  EuroCircleOutlined,
  FieldTimeOutlined,
  FilePdfOutlined,
  MobileOutlined,
  PhoneOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constants/ServerURL';
import { UserContext } from '../../context/UserContext';
import Contract from '../../interfaces/contract';

function Account() {
  const userContext = useContext(UserContext);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (userContext?.user?.email) {
      const fetchSignedContract = async () => {
        const response = await axios.get(
          SERVER_URL(`fetchContract/${userContext?.user?.email}`),
          {
            withCredentials: true,
          }
        );
        setContract(response.data.contract[0]);
      };
      fetchSignedContract();
    }
  }, [userContext?.user]);

  return (
    <div className='account-body'>
      <img
        src={pngImage}
        alt='image'
      />

      <div className='details'>
        <div className='progress'>
          <span>
            <h2>MB</h2>
            <Progress
              percent={100}
              type='line'
              strokeColor={'#7e31a1'}
              status='exception'
            />
          </span>
          <Progress
            percent={31}
            type='circle'
            strokeColor={'#7e31a1'}
          />

          <span>
            <h2>Minutes</h2>
            <Progress
              percent={20}
              type='line'
              strokeColor={'#7e31a1'}
            />
          </span>
          <Progress
            percent={20}
            type='circle'
            strokeColor={'#7e31a1'}
          />
        </div>

        <h1 className='contract-name'>Contract {contract?.plan.nameOfPlan}</h1>
        <div className='contract'>
          <div className='contract__info'>
            <h2 className='border'>
              <FieldTimeOutlined /> Duration: 24 months
            </h2>
            <h2 className='border'>
              <FieldTimeOutlined /> Start/End date:{' '}
              {new Date(contract?.date).toLocaleDateString()} -{' '}
              {new Date(
                new Date(contract?.date).setFullYear(
                  new Date(contract?.date).getFullYear() + 2
                )
              ).toLocaleDateString()}
            </h2>
            <h2 className='border'>
              <PhoneOutlined /> Calls: {contract?.plan.minutesInBG} in BG
            </h2>
            <h2 className='border'>
              <PhoneOutlined /> Calls: {contract?.plan.minutesInEU} in EU
            </h2>
            <h2 className='border'>
              <WifiOutlined /> MB: {contract?.plan.MB} - {contract?.plan.MBps}{' '}
              MBps
            </h2>
            <h2 className='border'>
              Price: {contract?.plan.price} <EuroCircleOutlined />
            </h2>
          </div>

          <br />
          <div className='device-info'>
            {contract?.device && (
              <>
                <h2>
                  <MobileOutlined /> Device: {contract?.device.model}
                </h2>
                {contract.typeOfPayment.includes('Monthly') && (
                  <h2>
                    {contract.typeOfPayment}:{' '}
                    {Math.ceil(
                      (contract.device.price -
                        contract.plan.discountForDevice) /
                        24
                    )}{' '}
                    <EuroCircleOutlined />
                  </h2>
                )}
                <h2>
                  Contract: <FilePdfOutlined />
                </h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
