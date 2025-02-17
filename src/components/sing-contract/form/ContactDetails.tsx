import './contact-details.scss';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { openNotification } from '../../../helpers/notifications-functions/openNotification';
import { EuroCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { DeviceContext } from '../../../context/PickedDeviceContext';
import { Device } from '../../../interfaces/device';
import { Plan } from '../../../interfaces/plan';
import { UserContext } from '../../../context/UserContext';
import { ContractInfo } from '../../../interfaces/contractInfo';

interface ContactDetailsProps {
  form: ContractInfo;
  setForm: any;
  device: Device | null;
  plan: Plan | null;
  setIsFormComplete: any;
}

function ContactDetails({
  form,
  setForm,
  device,
  plan,
  setIsFormComplete,
}: ContactDetailsProps) {
  const [formComponent] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const isDevicePicked = useContext(DeviceContext);
  const userContext = useContext(UserContext);
  const monthlyDevicePrice = plan?.discountForDevice
    ? Math.ceil((device?.price - plan.discountForDevice) / 24)
    : 0;

  const updateForm = (e: any, prop: any) => {
    setForm({
      ...form,
      [e]: prop,
      email: userContext?.user?.email,
      device: device,
      plan: plan,
      date: new Date().toLocaleDateString(),
    });
  };

  const submit = () => {
    openNotification({
      api: api,
      icon: <SmileOutlined />,
      message: 'Success',
      description: 'Form filled successfully!',
    });
    setIsFormComplete(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: 16,
          },
        },
      }}
    >
      <div className='contact-details'>
        {contextHolder}
        <h2>
          Contact information <br />
        </h2>
        <Form
          className='form'
          form={formComponent}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          size='large'
          onFinish={submit}
          onFieldsChange={(e) => updateForm(e[0].name[0], e[0].value)}
        >
          {plan?.typeOfPlan === 'corporate' && (
            <Form.Item
              name='bulstat'
              label='Bulstat'
              rules={[{ required: true }]}
            >
              <Input className='input' />
            </Form.Item>
          )}
          <Form.Item
            name='fullName'
            label='Full name'
            rules={[{ required: true }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            name='address'
            label='Address'
            rules={[{ required: true }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Paper contract'
            name='paperContract'
            rules={[{ required: true }]}
          >
            <Select
              className='input'
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
          </Form.Item>
          <p>
            Econt offers express delivery from 1 to 2 work days for 5.99 Euro!
          </p>
          <Form.Item
            name='delivery'
            label='Delivery by firm'
            rules={[{ required: true }]}
          >
            <Select
              className='input'
              options={[
                { label: 'Econt', value: 'Econt' },
                { label: 'Speedy', value: 'Speedy' },
              ]}
            />
          </Form.Item>
          {isDevicePicked && device && (
            <>
              {monthlyDevicePrice > 0 ? (
                <Form.Item
                  label='Type of payment'
                  name='typeOfPayment'
                  rules={[{ required: true }]}
                >
                  <Select
                    className='input'
                    options={[
                      { label: 'Cash', value: 'cash' },
                      { label: 'By card', value: 'byCard' },
                      {
                        label: (
                          <>
                            Monthly installment agreement - {monthlyDevicePrice}
                            <EuroCircleOutlined />
                          </>
                        ),
                        value: 'Monthly installment agreement',
                      },
                    ]}
                  />
                </Form.Item>
              ) : (
                <>
                  <p>Device is free!</p>
                </>
              )}
            </>
          )}

          <>
            <p>Submit form to load contract documents</p>
            <Form.Item
              wrapperCol={{ offset: 6 }}
              className='buttons'
            >
              <Button
                type='primary'
                className='btn'
                htmlType='submit'
                style={{ margin: '0px 10px' }}
              >
                Submit
              </Button>
              <Button
                className='btn'
                onClick={() => formComponent.resetFields()}
              >
                Reset
              </Button>
            </Form.Item>
          </>
        </Form>
      </div>
    </ConfigProvider>
  );
}

export default ContactDetails;
