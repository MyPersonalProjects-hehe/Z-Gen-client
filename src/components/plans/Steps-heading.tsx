import {
  FileDoneOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';

function StepsHeading() {
  return (
    <>
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
    </>
  );
}

export default StepsHeading;
