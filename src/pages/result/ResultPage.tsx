import { Button, ConfigProvider, Result } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();
  const contractId = useParams();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7e31a1',
        },
      }}
    >
      <Result
        style={{ marginTop: '10rem' }}
        status='success'
        title='Successfully signed contract! You can view your contract update in Account menu.'
        subTitle={`Contract ID: ${contractId.id}`}
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
    </ConfigProvider>
  );
}

export default ResultPage;
