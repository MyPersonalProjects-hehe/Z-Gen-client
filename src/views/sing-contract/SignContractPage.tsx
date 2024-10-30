import './sign-contract-page.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlanCard from '../../components/home/PlanCard';
import { SERVER_URL } from '../../constants/ServerURL';
import { Plan } from '../../interfaces/plan';
import ChosenDevice from '../../components/sing-contract/ChosenDevice';
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

function SingContractPage() {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const deviceToken = localStorage.getItem('device');
  const device = deviceToken ? JSON.parse(deviceToken) : null;
  const [isDetailsComplete, setIsDetailsComplete] = useState(false);
  const [planCard, setPlanCard] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Are you sure you would like to continue?'
  );
  const [uploadingResult, setUploadingResult] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    typeOfPayment: '',
    paperContract: false,
    delivery: '',
    email: '',
    device: '',
    plan: '',
  });

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        const response = await axios.get(
          `${SERVER_URL(`fetchPlan/${contractId}`)}`,
          { withCredentials: true }
        );
        setPlanCard(response.data.plan);
      };

      fetchPlan();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isDetailsComplete) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isDetailsComplete]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0e2447',
          fontSize: 19,
        },
      }}
    >
      {uploadingResult ? (
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
                <ChosenDevice planCard={planCard} />
              </div>
            </div>

            <div className='user__contacts'>
              <ContactDetails
                setForm={setForm}
                form={form}
                device={device}
                plan={planCard}
                setIsDetailsComplete={setIsDetailsComplete}
              />
            </div>
            {isDetailsComplete && (
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
                  setUploadingResult: setUploadingResult,
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
