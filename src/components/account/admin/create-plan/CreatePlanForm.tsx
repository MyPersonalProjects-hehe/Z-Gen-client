import './create-plan-form.scss';
import axios from 'axios';
import { useState } from 'react';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { SERVER_URL } from '../../../../constants/ServerURL';
import { openNotification } from '../../../../helpers/notifications-functions/openNotification';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function CreatePlanForm() {
  const [api, contextHolder] = notification.useNotification();
  const [plan, setPlan] = useState({
    nameOfPlan: '',
    typeOfClient: '',
    typeOfPlan: '',
    minutesInBG: '',
    minutesInEU: '',
    MB: '',
    MBps: '',
    discountForDevice: '',
    price: '',
  });

  const setProps = (e: any, prop: string) => {
    setPlan({
      ...plan,
      [e]: prop,
    });
  };

  const submitPlan = async () => {
    try {
      const response = await axios.post(SERVER_URL('createPlan'), { plan });
      if (response.status === 200) {
        setPlan({
          nameOfPlan: '',
          typeOfClient: '',
          typeOfPlan: '',
          minutesInBG: '',
          minutesInEU: '',
          MB: '',
          MBps: '',
          discountForDevice: '',
          price: '',
        });
        openNotification({
          api: api,
          icon: <SmileOutlined />,
          message: 'Success',
          description: 'Plan created!',
        });
      }
    } catch (error: any) {
      openNotification({
        api: api,
        icon: <FrownOutlined />,
        message: 'Warning!',
        description: `Error: ${error.message}`,
      });
    }
  };

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
      <div className='admin-forms'>
        {contextHolder}
        <h1>Create Plan</h1>
        <Form
          {...formItemLayout}
          onFieldsChange={(e) => setProps(e[0].name[0], e[0].value)}
          onFinish={submitPlan}
          style={{ width: 900, fontSize: 60 }}
          variant='filled'
        >
          <Form.Item
            label='Name of plan'
            name='nameOfPlan'
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Type of client'
            name='typeOfClient'
            rules={[{ required: true }]}
          >
            <Select
              className='input'
              options={[
                { label: 'new', value: 'new' },
                { label: 'old', value: 'old' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label='Type of plan'
            name='typeOfPlan'
            rules={[{ required: true }]}
          >
            <Select
              className='input'
              options={[
                { label: 'regular', value: 'regular' },
                { label: 'corporate', value: 'corporate' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label='Minutes in Bulgaria'
            name='minutesInBG'
            rules={[{ required: true, message: 'Please write minutes!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Minutes in Europe'
            name='minutesInEU'
            rules={[{ required: true, message: 'Please write minutes!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='MB'
            name='MB'
            rules={[{ required: true, message: 'Please write MB!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='MBps'
            name='MBps'
            rules={[{ required: true, message: 'Please write MBps!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Discount for device'
            name='discountForDevice'
            rules={[
              { required: true, message: 'Please write discount for device!' },
            ]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Plan price'
            name='price'
            rules={[{ required: true, message: 'Please write price!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
              className='btn form-btn'
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
}

export default CreatePlanForm;
