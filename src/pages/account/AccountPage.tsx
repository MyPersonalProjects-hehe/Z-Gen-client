import './account-page.scss';
import { Result } from 'antd';
import pngImage from '../../assets/account/account-page.png';
import {
  EuroCircleOutlined,
  FieldTimeOutlined,
  FilePdfOutlined,
  MobileOutlined,
  PhoneOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Admin from '../../components/account/admin/Admin';
import contractPDF from '../../assets/Contract.pdf';
import { EligibleUser } from '../../context/EligibleUser';

function AccountPage() {
  const userContext = useContext(UserContext);
  const eligibleUser = useContext(EligibleUser);

  return (
    <>
      {userContext?.user?.admin ? (
        <Admin />
      ) : (
        <div>
          {eligibleUser?.contract ? (
            <div className='account-body'>
              <img
                src={pngImage}
                alt='image'
              />

              <div className='details'>
                <h1 className='contract-name'>
                  Contract {eligibleUser?.contract?.plan.nameOfPlan}
                </h1>
                <div className='contract'>
                  <div className='contract__info'>
                    <h2 className='border'>
                      <FieldTimeOutlined /> Duration: 24 months
                    </h2>
                    <h2 className='border'>
                      <FieldTimeOutlined /> Start/End date:{' '}
                      {new Date(
                        eligibleUser.contract?.date
                      ).toLocaleDateString()}{' '}
                      -{' '}
                      {new Date(
                        new Date(eligibleUser.contract?.date).setFullYear(
                          new Date(eligibleUser.contract?.date).getFullYear() +
                            2
                        )
                      ).toLocaleDateString()}
                    </h2>
                    <h2 className='border'>
                      <PhoneOutlined /> Calls in BG:{' '}
                      {eligibleUser.contract?.plan.minutesInBG}
                    </h2>
                    <h2 className='border'>
                      <PhoneOutlined /> Calls in EU:{' '}
                      {eligibleUser.contract?.plan.minutesInEU}
                    </h2>
                    <h2 className='border'>
                      <WifiOutlined /> MB: {eligibleUser.contract?.plan.MB} -{' '}
                      {eligibleUser.contract?.plan.MBps} MBps
                    </h2>
                    <h2 className='border'>
                      Price:{' '}
                      {(Number(eligibleUser.contract?.plan.price) - 4).toFixed(
                        2
                      )}{' '}
                      <EuroCircleOutlined />
                    </h2>
                  </div>

                  <br />
                  <div className='device-info'>
                    {eligibleUser.contract?.device && (
                      <>
                        <h2>
                          Device: {eligibleUser.contract?.device.model}{' '}
                          <MobileOutlined />
                        </h2>
                        {eligibleUser.contract.typeOfPayment.includes(
                          'Monthly'
                        ) && (
                          <h2>
                            {eligibleUser.contract.typeOfPayment}:{' '}
                            {Math.ceil(
                              (eligibleUser.contract.device.price -
                                eligibleUser.contract.plan.discountForDevice) /
                                24
                            )}{' '}
                            <EuroCircleOutlined />
                          </h2>
                        )}
                        <a
                          href={contractPDF}
                          download='Contract'
                          target='_blank'
                        >
                          <h2>
                            Contract: <FilePdfOutlined />
                          </h2>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='no-contract'>
              <h1>It seems you have not signed a contract yet!</h1>
              <h2>
                What are you waiting for? Dive in the best telecom providers!
              </h2>
              <Result
                status='404'
                subTitle='No signed contract!'
              />
              <h2>Mobile number: {userContext?.user?.phoneNumber}</h2>
              <h2>Email: {userContext?.user?.email}</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AccountPage;
