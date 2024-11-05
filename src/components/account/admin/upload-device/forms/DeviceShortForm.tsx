import axios from 'axios';
import { useState } from 'react';
import { SERVER_URL } from '../../../../../constants/ServerURL';
import { Button, ConfigProvider, Form, Input, notification } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { openNotification } from '../../../../../helpers/notifications-functions/openNotification';

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

function DeviceShortForm() {
  const [api, contextHolder] = notification.useNotification();
  const [deviceMainInfo, setDeviceMainInfo] = useState({
    model: '',
    RAM: '',
    mainImage: '',
    secondImage: '',
    thirdImage: '',
    price: 0,
  });

  const setProps = (e: any, prop: string) => {
    setDeviceMainInfo({
      ...deviceMainInfo,
      [e]: prop,
    });
  };

  const uploadMainInfo = async () => {
    try {
      const result = await axios.post(
        SERVER_URL('uploadMainInfo'),
        deviceMainInfo,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setDeviceMainInfo({
          model: '',
          RAM: '',
          mainImage: '',
          secondImage: '',
          thirdImage: '',
          price: 0,
        });

        openNotification({
          api: api,
          icon: <SmileOutlined />,
          description: 'Success!',
          message: 'Form uploaded!',
        });
      }
    } catch (error: any) {
      openNotification({
        api: api,
        icon: <FrownOutlined />,
        description: 'Warning!',
        message: `Error ${error.message}!`,
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
        <h1>Write the device`s main info</h1>
        <p>
          Models are case sensitive! Please write model name with capital
          letter!
        </p>
        <Form
          {...formItemLayout}
          onFieldsChange={(e) => setProps(e[0].name[0], e[0].value)}
          onFinish={uploadMainInfo}
          style={{ width: 900, fontSize: 60 }}
          variant='filled'
        >
          <Form.Item
            label='Model'
            name='model'
            rules={[{ required: true, message: 'Please write model!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='RAM'
            name='RAM'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Main image  URL'
            name='mainImage'
            rules={[{ required: true, message: 'Please provide main image!' }]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Second image URL'
            name='secondImage'
            rules={[
              { required: true, message: 'Please provide a second image!' },
            ]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Third image URL'
            name='thirdImage'
            rules={[
              { required: true, message: 'Please provide a third image!' },
            ]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Price'
            name='price'
            rules={[{ required: true, message: 'Please write a price!' }]}
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

export default DeviceShortForm;
