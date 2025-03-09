import './sign-contract-page.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';
import ChosenDevice from '../../components/sing-contract/chosen-device/ChosenDevice';
import { Button, Checkbox, ConfigProvider, Modal, Spin, Steps } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import ContactDetails from '../../components/sing-contract/form/ContactDetails';
import contract from '../../assets/Contract.pdf';
import {
  closeModal,
  showModal,
  uploadContract,
} from '../../helpers/modal-functions/modal-functions';
import PlanCard from '../../components/plans/plan-card/PlanCard';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';
import { EligibleUserContext } from '../../context/EligibleUserContext';
import { UserContext } from '../../context/UserContext';

function SingContractPage() {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const deviceContext = useContext(DeviceContext);
  const eligibleUser = useContext(EligibleUserContext);
  const userContext = useContext(UserContext);
  const [device, setDevice] = useState<Device | null>(null);
  const [planCard, setPlanCard] = useState<Plan | null>(null);
  /**State for checking when form is completed */
  const [isFormComplete, setIsFormComplete] = useState(false);
  /**Ref for set timeout */
  const timerIdRef = useRef(null);
  /**State for opening the modal */
  const [open, setOpen] = useState(false);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Would you like to continue?');
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    typeOfPayment: '',
    paperContract: false,
    delivery: '',
    email: '',
    device: '',
    plan: '',
    date: '',
    bulstat: '',
  });

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        const response = await axios.get(
          `${SERVER_URL(`fetchPlan/${contractId}`)}`,
          { withCredentials: true }
        );
        setPlanCard(response.data.plan);
        /**Get picked device every time global Device Context changes */
        const deviceUnparsed = localStorage.getItem('device');
        const deviceItem = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';
        if (deviceItem) {
          setDevice(deviceItem);
        } else {
          form.device = '';
          setDevice(null);
        }
      };

      fetchPlan();
    } catch (error) {
      console.log(error);
    }
  }, [deviceContext?.isDevicePicked]);

  useEffect(() => {
    /**Add an useEffect to handle scrolling
     * only when the form is complete */
    if (isFormComplete) {
      window.scrollTo({
        top: document.documentElement.scrollHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [isFormComplete]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0e2447',
          fontSize: 19,
        },
      }}
    >
      <div>
        <div className='sign-contract-body'>
          {!eligibleUser?.isEligible && (
            <>
              <h1>You are not eligible for signing contracts!</h1>
              <h2>
                {`Next eligibility date: ${eligibleUser?.dateOfEligibility}`}
              </h2>
            </>
          )}
          {userContext?.user?.admin && (
            <h1>
              You are not eligible for contract signing because of Admin rights
            </h1>
          )}
          <div className='progress'>
            <Steps
              current={1}
              items={[
                {
                  title: 'Finished',
                  description: 'Pick a plan',
                  icon: <CheckCircleOutlined />,
                },
                {
                  title: device ? 'Finished' : 'In Progress',
                  description: 'Pick a device',
                  icon: device ? (
                    <CheckCircleOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  ),
                },
                {
                  title: 'Waiting',
                  description: 'Sign contract',
                  icon: <ExclamationCircleOutlined />,
                },
              ]}
            />
          </div>

          {planCard || device ? (
            <div className='picked__items'>
              <div className='chosen-plan'>
                <h2>Chosen plan</h2>
                <PlanCard
                  plan={planCard}
                  isCorporate={planCard?.typeOfPlan === 'corporate'}
                  signContractPage={true}
                />
              </div>
              <div className='chosen-device'>
                <ChosenDevice
                  planCard={planCard}
                  device={device}
                />
              </div>
            </div>
          ) : (
            <Spin size='large'>No items picked</Spin>
          )}

          {eligibleUser?.isEligible && !userContext?.user?.admin && (
            <>
              <div className='user__contacts'>
                <ContactDetails
                  setForm={setForm}
                  form={form}
                  device={device}
                  plan={planCard}
                  setIsFormComplete={setIsFormComplete}
                />
              </div>
              {isFormComplete && (
                <div className='text-block'>
                  <h2>You are almost done!</h2>
                  <SmileOutlined className='smile-icon' />
                  <h2 className='heading'>
                    For best experience, all contracts have trial period of 14
                    days!
                  </h2>
                  <h2>
                    If you are not delighted with our contract you can visit the
                    nearest shop and declare a contract cancellation. The
                    cancellation is considered for processing of how we can
                    improve our services.
                  </h2>
                  <a
                    href={contract}
                    download='Contract'
                    target='_blank'
                  >
                    <Button
                      className='btn'
                      type='primary'
                      onClick={() => setCheckboxClicked(true)}
                    >
                      Download Contract
                    </Button>
                  </a>
                </div>
              )}
              {checkboxClicked && (
                <>
                  <span className='checkbox'>
                    <Checkbox>
                      I have read all the terms and conditions.
                    </Checkbox>
                    <Checkbox>
                      I agree the Provider to collect personal information
                      necessary for the execution of this contract.
                    </Checkbox>
                  </span>
                  <Button
                    className='btn'
                    type='primary'
                    onClick={() => showModal(setOpen)}
                  >
                    Sign contract
                  </Button>
                </>
              )}

              <Modal
                open={open}
                destroyOnClose={true}
                onOk={() =>
                  uploadContract({
                    setModalText: setModalText,
                    setConfirmLoading: setConfirmLoading,
                    setOpen: setOpen,
                    navigate: navigate,
                    setDevicePicked:
                      deviceContext?.setDevicePicked || (() => {}),
                    setEligibility: eligibleUser?.setIsEligible || (() => {}),
                    modalText: 'Signing contract',
                    contractInfo: form,
                    contractId: contractId,
                    timerIdRef: timerIdRef,
                  })
                }
                confirmLoading={confirmLoading}
                onCancel={() =>
                  closeModal(setOpen, setConfirmLoading, timerIdRef)
                }
              >
                <p>{modalText}</p>
              </Modal>
            </>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
export default SingContractPage;
