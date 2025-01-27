import { useParams } from 'react-router-dom';
import './platform-sign-page.scss';
import netflixLogo from '../../assets/logos/netflix.png';
import hboLogo from '../../assets/logos/hbo.png';
import disneyLogo from '../../assets/logos/disney.png';
import { Button, Checkbox, ConfigProvider, Modal } from 'antd';
import { useState } from 'react';

function PlatformSignPage() {
  const { platformName } = useParams();
  const { packageType } = useParams();
  const { price } = useParams();
  /**Modal state */
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Would you like to continue?');
  const [closeIcon, setCloseIcon] = useState(true);

  const toggleClassName = () => {
    if (packageType === 'Basic') {
      return 'platform basic__platform';
    }
    if (packageType === 'Premium') {
      return 'platform premium__platform';
    }
    if (packageType === 'Standard') {
      return 'platform standard__platform';
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Loading');
    setConfirmLoading(true);
    setCloseIcon(false);
    3;
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7e31a1',
          fontSize: 19,
        },
      }}
    >
      <div className='sign-page-body'>
        <span className={toggleClassName()}>
          <h2>{packageType}</h2>
          {platformName === 'netflix' && (
            <img
              src={netflixLogo}
              alt='logo'
            />
          )}
          {platformName === 'hbo-max' && (
            <img
              src={hboLogo}
              alt='logo'
            />
          )}
          {platformName === 'disney-plus' && (
            <img
              src={disneyLogo}
              alt='logo'
            />
          )}

          <p className='price-package'>Price: {price}</p>
        </span>
        <ul className='platform__terms'>
          <h1>Terms of use:</h1>
          <li>Streaming platform offers</li>
          <p>
            {' '}
            Users may purchase access to streaming platforms at a preferential
            price, which is €3 less than the original price offered by the
            platform. When purchasing a streaming platform, you will enter into
            a two-year contractual agreement.
            <br />
            1.1. For users who have a signed contract with our mobile services:
            <br />
            - The first year of access to the streaming platform will be free of
            charge.
            <br />- During the second year, you will be charged the preferential
            price (€3 less than the original price of the streaming platform).
            <br />
            1.2. For users who have not signed yet a contract:
            <br />- The user can purchase the streaming platform again with
            preferential price till the end of contract.
          </p>
          <li>Post-Contract Pricing</li>
          <p>
            If you do not personally terminate the contract after the two-year
            period, the pricing for the streaming platform will automatically
            switch to the non-preferential price, which is €3 more than the
            preferential price.
          </p>
          <li>User Responsibilities</li>
          <p>
            It is your responsibility to track the duration of your contracts
            and notify us if you wish to terminate them before they transition
            to non-preferential pricing. By subscribing to a streaming platform
            through our service, you acknowledge that you have read and
            understood the pricing structure outlined in these Terms.
          </p>
          <li>Cancellation and Termination</li>
          <p className='cancellation-paragraph'>
            You may cancel your contract at any time after the two-year minimum
            term by providing notice through your account or by visiting one of
            our shops.
          </p>
          <h3>
            If the user ends the contract before its initial length, the user
            would have to pay 3 non-preferential taxes!
          </h3>
          <li>Changes to Terms</li>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be communicated to users through email or platform notifications.
            Continued use of our services after such modifications constitutes
            acceptance of the updated Terms.
          </p>
        </ul>

        <Checkbox>I have read all the terms and conditions.</Checkbox>
        <Checkbox
          style={{
            marginBottom: 30,
          }}
        >
          I agree the Provider to collect personal information necessary for the
          execution of this contract.
        </Checkbox>
        <Button
          className='btn'
          type='primary'
          onClick={() => showModal()}
        >
          Sign contract
        </Button>
        <Modal
          closeIcon={closeIcon}
          title='Purchasing platform'
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default PlatformSignPage;
