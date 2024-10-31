import './sign-contract-page.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';
import ChosenDevice from '../../components/sing-contract/chosen-device/ChosenDevice';
import { Button, Checkbox, ConfigProvider, Modal, Result, Steps } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import ContactDetails from '../../components/sing-contract/form/ContactDetails';
import contract from '../../assets/ZGen Telecom Providers.pdf';
import {
  handleCancel,
  handleOk,
  showModal,
} from '../../helpers/modal-functions/openModal';
import PlanCard from '../../components/plans/plan-card/PlanCard';
import { Device } from '../../interfaces/device';
import { DeviceContext } from '../../context/PickedDeviceContext';

function SingContractPage() {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const deviceContext = useContext(DeviceContext);
  const [device, setDevice] = useState<Device | null>(null);
  const [planCard, setPlanCard] = useState<Plan | null>(null);
  /**State for checking when form is completed */
  const [isFormComplete, setIsFormComplete] = useState(false);
  /**State for opening the modal */
  const [open, setOpen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Are you sure you would like to continue?'
  );
  /**State for checking when contract steps are finished */
  const [isFinished, setIsFinished] = useState(false);
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
  });

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        const response = await axios.get(
          `${SERVER_URL(`fetchPlan/${contractId}`)}`,
          { withCredentials: true }
        );
        /**Get picked device every time global Device Context changes */
        const deviceUnparsed = localStorage.getItem('device');
        const deviceItem = deviceUnparsed ? JSON.parse(deviceUnparsed) : '';
        setDevice(deviceItem);
        setPlanCard(response.data.plan);
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
      window.scroll({
        top: document.body.scrollHeight,
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
      {isFinished ? (
        <div>
          <Result
            style={{ marginTop: '10rem' }}
            status='success'
            title='Successfully signed contract! You can view your contract update in Account menu.'
            subTitle={`Contract ID: ${contractId}`}
            extra={[
              <Button
                onClick={() => navigate('/account')}
                type='primary'
                key='console'
                className='btn'
              >
                Account
              </Button>,
            ]}
          />
        </div>
      ) : (
        <div>
          <div className='sign-contract-body'>
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
                    description: 'e',
                    icon: <ExclamationCircleOutlined />,
                  },
                ]}
              />
            </div>
            <div className='picked__items'>
              <div className='chosen-plan'>
                <h2>Chosen plan</h2>
                <PlanCard
                  plan={planCard}
                  isCorporate={planCard?.typeOfPlan === 'corporate'}
                  signContractPage={true}
                />
              </div>
              <PlusCircleOutlined className='plus-icon' />
              <div className='chosen-device'>
                <ChosenDevice
                  planCard={planCard}
                  device={device}
                />
              </div>
            </div>

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
                  nearest shop and declare a contract cancelation. The
                  cancelation is considered for processing of how we can improve
                  our services.
                </h2>
                <a
                  href={contract}
                  download='Contract'
                  target='_blank'
                >
                  <Button
                    className='btn'
                    type='primary'
                    onClick={() => setToggleCheckBox(true)}
                  >
                    Download Contract
                  </Button>
                </a>
              </div>
            )}
            {toggleCheckBox && (
              <>
                <Checkbox>I have read all the terms and conditions.</Checkbox>
                <Checkbox>
                  I agree my personal information to be visible.
                </Checkbox>
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
              onOk={() =>
                handleOk({
                  setModalText: setModalText,
                  setConfirmLoading: setConfirmLoading,
                  setOpen: setOpen,
                  modalText: 'Signing contract',
                  contactInfo: form,
                  setIsFinished: setIsFinished,
                })
              }
              confirmLoading={confirmLoading}
              onCancel={() => handleCancel(setOpen)}
            >
              <p>{modalText}</p>
            </Modal>
          </div>
        </div>
      )}
    </ConfigProvider>
  );
}
export default SingContractPage;
