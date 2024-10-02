import {
  FileDoneOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';

function StepsHeading() {
  return (
    <div className='terms-info'>
      <h1>Signing contracts was never easier!</h1>
      <Steps
        items={[
          {
            title: 'Login',
            status: 'finish',
            icon: <UserOutlined />,
          },
          {
            title: 'Pick a plan',
            status: 'finish',
            icon: <FileDoneOutlined />,
          },
          {
            title: 'Done',
            status: 'finish',
            icon: <SmileOutlined />,
          },
        ]}
      />
    </div>
  );
}

export default StepsHeading;
