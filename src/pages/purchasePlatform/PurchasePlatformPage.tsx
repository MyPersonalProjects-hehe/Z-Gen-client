import './purchase-platform-page.scss';
import { useNavigate, useParams } from 'react-router-dom';
import netflixLogo from '../../assets/logos/netflix.png';
import hboLogo from '../../assets/logos/hbo.png';
import disneyLogo from '../../assets/logos/disney.png';
import { Button, Checkbox, ConfigProvider, Modal } from 'antd';
import { useContext, useState } from 'react';
import {
  buyStreamingPlatform,
  closeModal,
  showModal,
} from '../../helpers/modal-functions/modal-functions';
import { purchasedPlatformContext } from '../../context/PurchasedPlatform';
import { UserContext } from '../../context/UserContext';

function PurchasePlatformPage() {
  const { platformName } = useParams();
  const { packageType } = useParams();
  const { price } = useParams();
  const { id } = useParams();
  const platformContext = useContext(purchasedPlatformContext);
  const userContext = useContext(UserContext);
  const streamingPlatformInfo = {
    platformName: platformName,
    packageType: packageType,
    price: price,
    id: id,
    userId: userContext?.user?.id,
  };
  const navigate = useNavigate();
  /**Modal state */
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Would you like to continue?');
  const [closeIcon, setCloseIcon] = useState(true);
  const [checkboxClicked, setCheckboxClicked] = useState(false);

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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7e31a1',
          fontSize: 19,
        },
      }}
    >
      <div className='purchase-platform-body'>
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
          onClick={() => setCheckboxClicked(true)}
        >
          I agree the Provider to collect personal information necessary for the
          execution of this contract.
        </Checkbox>
        {checkboxClicked && (
          <Button
            className='btn'
            type='primary'
            onClick={() => showModal(setOpen)}
          >
            Sign contract
          </Button>
        )}
        <Modal
          closeIcon={closeIcon}
          title='Purchasing platform'
          open={open}
          onOk={() =>
            buyStreamingPlatform({
              setCloseIcon: setCloseIcon,
              setConfirmLoading: setConfirmLoading,
              setModalText: setModalText,
              setOpen: setOpen,
              navigate: navigate,
              streamingPlatformInfo: streamingPlatformInfo,
              platformContext: platformContext,
            })
          }
          confirmLoading={confirmLoading}
          onCancel={() => closeModal(setOpen)}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default PurchasePlatformPage;
