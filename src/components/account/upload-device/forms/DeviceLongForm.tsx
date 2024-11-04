import { useState } from 'react';
import { SERVER_URL } from '../../../../constants/ServerURL';
import axios from 'axios';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  notification,
  Select,
} from 'antd';
import { openNotification } from '../../../../helpers/notifications-functions/openNotification';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

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

interface DeviceProps {
  models: string[];
}

function DeviceLongForm({ models }: DeviceProps) {
  const [api, contextHolder] = notification.useNotification();
  const [deviceFullInfo, setDeviceFullInfo] = useState({
    model: '',
    operationSystem: '',
    processor: '',
    batteryCapacity: '',
    camera: '',
    selfieCamera: '',
    functions: '',
    weight: '',
    corpus: '',
    waterProof: '',
  });

  const setProps = (e: any, prop: string) => {
    setDeviceFullInfo({
      ...deviceFullInfo,
      [e]: prop,
    });
  };

  const uploadFullInfo = async () => {
    try {
      const result = await axios.post(
        SERVER_URL('uploadFullInfo'),
        deviceFullInfo,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setDeviceFullInfo({
          model: '',
          operationSystem: '',
          processor: '',
          batteryCapacity: '',
          camera: '',
          selfieCamera: '',
          functions: '',
          weight: '',
          corpus: '',
          waterProof: '',
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
        <h1>Write the device`s full info</h1>
        <Form
          {...formItemLayout}
          onFieldsChange={(e) => setProps(e[0].name[0], e[0].value)}
          onFinish={uploadFullInfo}
          style={{ width: 900, fontSize: 60 }}
          variant='filled'
        >
          <Form.Item
            label='Model'
            name='model'
            rules={[{ required: true }]}
          >
            <Select
              className='input'
              options={models.map((model) => ({ label: model, value: model }))}
            />
          </Form.Item>

          <Form.Item
            label='Operation system'
            name='operationSystem'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='processor'
            name='processor'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Functions/Extras'
            name='functions'
            rules={[
              { required: true, message: 'Please write at least one extra!' },
            ]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Camera'
            name='camera'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Selfie camera'
            name='selfieCamera'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Battery capacity'
            name='batteryCapacity'
            rules={[
              { required: true, message: 'Please write battery capacity!' },
            ]}
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Weight'
            name='weight'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Corpus'
            name='corpus'
          >
            <Input className='input' />
          </Form.Item>

          <Form.Item
            label='Water proof'
            name='waterProof'
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

export default DeviceLongForm;
