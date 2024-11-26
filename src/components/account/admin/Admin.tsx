import './admin.scss';
import adminImage from '../../../assets/account/admin-img.png';
import { useNavigate } from 'react-router-dom';
import {
  FrownOutlined,
  SmileOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  ConfigProvider,
  notification,
  Space,
  Table,
  TableProps,
  Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../constants/ServerURL';
import Contract from '../../../interfaces/contract';
import { openNotification } from '../../../helpers/notifications-functions/openNotification';

interface DataType {
  key: string;
  name: string;
  address: string;
  tags: string[];
  delivery: string;
  _id: string;
}

function Admin() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    try {
      const fetchContracts = async () => {
        const response = await axios.get(SERVER_URL('allContracts'), {
          withCredentials: true,
        });

        if (response.status === 200) {
          const contracts = response.data.contracts.reduce(
            (acc: any[], contract: Contract, index: number) => {
              const tags: any[] = [`${contract.plan.nameOfPlan}`];

              if (contract.paperContract) {
                tags.push('Paper contract');
              }
              if (contract.typeOfPayment.length > 0) {
                tags.push(contract.typeOfPayment);
              }

              acc.push({
                key: (index + 1).toString(),
                address: contract.address,
                name: contract.fullName,
                tags: tags,
                delivery: contract.delivery,
                responsive: ['lg'],
                _id: contract._id,
              });
              return acc;
            },
            []
          );
          setContracts(contracts);
        }
      };
      fetchContracts();
    } catch (err) {
      console.log(err);
    }
  }, [isDeleted]);

  const deleteContract = async (contractId: string) => {
    try {
      const response = await axios.delete(
        SERVER_URL(`deleteContract/${contractId}`)
      );
      if (response.status === 200) {
        setIsDeleted((prev) => !prev);
        openNotification({
          api: api,
          icon: <SmileOutlined />,
          message: 'Success',
          description: 'Contract send successfully',
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

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'green' : 'geekblue';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag
                color={color}
                key={tag}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Delivery Firm',
      key: 'delivery',
      render: (_, record) => (
        <Space size='middle'>
          <a>{record.delivery}</a>
          <a onClick={() => deleteContract(record._id)}>Confirm</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = contracts;

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: 'black',
            footerColor: 'red',
          },
        },
      }}
    >
      <div className='admin-body'>
        {contextHolder}

        <span>
          <h1>How can we help you today?</h1>
          <img
            src={adminImage}
            alt='image'
          />
        </span>
        <div className='functionalities'>
          <div>
            <h1>
              <UploadOutlined /> Upload
            </h1>
            <span
              className='navigate-btn'
              onClick={() => navigate('/createPlan')}
            >
              Plan
            </span>
            <span
              className='navigate-btn'
              onClick={() => navigate('/uploadDevice')}
            >
              Device
            </span>
          </div>

          <div className='contracts'>
            <h2>Contracts</h2>
            <Table<DataType>
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Admin;
