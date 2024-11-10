import './admin.scss';
import adminImage from '../../../assets/account/admin-img.png';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { ConfigProvider, Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../constants/ServerURL';
import Contract from '../../../interfaces/contract';

interface DataType {
  key: string;
  name: string;
  address: string;
  tags: string[];
  delivery: string;
}

function Admin() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);

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
  }, []);
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
          <a>Confirm order</a>
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
        <div className='functionalities'>
          <span>
            <h1>How can we help you today?</h1>
            <img
              src={adminImage}
              alt='image'
            />
          </span>
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
        </div>

        <div className='contracts'>
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Admin;
