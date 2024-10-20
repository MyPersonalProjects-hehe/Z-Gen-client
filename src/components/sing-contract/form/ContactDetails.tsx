import './contact-details.scss';
import {
  Button,
  ConfigProvider,
  Flex,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { useState } from 'react';
import { openNotification } from '../../../helpers/notifications-functions/openNotification';
import { SmileOutlined } from '@ant-design/icons';

function ContactDetails() {
  const [formComponent] = Form.useForm();
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    typeOfPayment: '',
    paperContract: '',
    delivery: '',
    nameOfDeliveryFirm: '',
  });

  const [api, contextHolder] = notification.useNotification();

  const updateForm = (e: any, prop: string) => {
    setForm({
      ...form,
      [e]: prop,
    });
  };

  const submit = () => {
    openNotification({
      api: api,
      icon: <SmileOutlined />,
      message: 'Success',
      description: 'Form filled successfully!',
    });
    console.log(form);
    handleScroll();
  };

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7e31a1',
        },
        components: {
          Form: {
            labelFontSize: 22,
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
          <Form.Item
            name='fullName'
            label='Full name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='address'
            label='Address'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='delivery'
            label='Delivery by a firm ?'
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
          </Form.Item>

          {form.delivery === 'yes' && (
            <>
              <p>
                Econt offers express delivery from 1 to 2 work days for 5.99
                Euro!
              </p>
              <Form.Item
                label='Pick firm'
                name='nameOfDeliveryFirm'
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Econt', value: 'Econt' },
                    { label: 'Speedy', value: 'Speedy' },
                  ]}
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            label='Type of payment'
            name='typeOfPayment'
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'Cash', value: 'cash' },
                { label: 'By card', value: 'byCard' },
                { label: 'No device picked', value: 'noDevicePicked' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label='Paper contract'
            name='paperContract'
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
          </Form.Item>

          <>
            <p>Submit form to load contract documents</p>
            <Form.Item
              wrapperCol={{ offset: 6 }}
              className='buttons'
            >
              <Flex gap='small'>
                <Button
                  type='primary'
                  className='btn'
                  htmlType='submit'
                >
                  Submit
                </Button>
                <Button
                  className='btn'
                  onClick={() => formComponent.resetFields()}
                >
                  Reset
                </Button>
              </Flex>
            </Form.Item>
          </>
        </Form>
      </div>
    </ConfigProvider>
  );
}

export default ContactDetails;
