import './account-page.scss';
import { Result, Card, Tag, Divider, Space, Button } from 'antd';
import pngImage from '../../assets/account/account-page.png';
import {
  EuroCircleOutlined,
  FieldTimeOutlined,
  FilePdfOutlined,
  PercentageOutlined,
  PhoneOutlined,
  WifiOutlined,
  CrownOutlined,
  CalendarOutlined,
  MobileOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Admin from '../../components/account/admin/Admin';
import contractPDF from '../../assets/Contract.pdf';
import { EligibleUserContext } from '../../context/EligibleUserContext';
import { PurchasedPlatformContext } from '../../context/PurchasedPlatformContext';
import netflixImg from '../../assets/logos/netflix.jpg';
import disneyImg from '../../assets/logos/disney.png';
import hboImg from '../../assets/logos/hbo.png';
import contract from '../../assets/Streaming-Platform-Contract.pdf';

function AccountPage() {
  const userContext = useContext(UserContext);
  const eligibleUser = useContext(EligibleUserContext);
  const platformContext = useContext(PurchasedPlatformContext);

  const toggleImg = () => {
    if (platformContext?.streamingPlatform.platformName === 'HBO')
      return hboImg;
    if (platformContext?.streamingPlatform.platformName === 'Netflix')
      return netflixImg;
    if (platformContext?.streamingPlatform.platformName === 'Disney')
      return disneyImg;
  };


  const getPackageTypeColor = (packageType: string) => {
    switch (packageType?.toLowerCase()) {
      case 'premium': return 'gold';
      case 'standard': return 'blue';
      case 'basic': return 'green';
      default: return 'default';
    }
  };
  console.log(eligibleUser?.contract);

  return (
    <>
      {userContext?.user?.admin ? (
        <Admin />
      ) : (
        <div className="modern-account-container">
          {eligibleUser?.contract ? (
            <div className="contract-section">
              <div className="hero-section">
                <div className="hero-content">
                  <Card className="hero-card">
                    <div className="hero-info">
                      <CrownOutlined className="hero-icon" />
                      <h1 className="hero-title">
                        {eligibleUser?.contract?.plan.nameOfPlan}
                      </h1>
                      <p className="hero-subtitle">Premium Telecom Plan</p>
                    </div>
                    <div className="hero-image">
                      <img
                        src={pngImage}
                        alt="Account illustration"
                        className="hero-img"
                      />
                    </div>
                  </Card>
                </div>
              </div>

              <div className="details-grid">
                <Card
                  title={
                    <Space>
                      <FieldTimeOutlined />
                      <span>Plan Details</span>
                    </Space>
                  }
                  className="detail-card plan-card"
                >
                  <div className="info-item">
                    <CalendarOutlined className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">Duration</span>
                      <span className="info-value">24 months</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <CalendarOutlined className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">Contract Period</span>
                      <span className="info-value">
                        {new Date(eligibleUser.contract?.date).toLocaleDateString()} - {' '}
                        {new Date(
                          new Date(eligibleUser.contract?.date).setFullYear(
                            new Date(eligibleUser.contract?.date).getFullYear() + 2
                          )
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="info-item price-highlight">
                    <EuroCircleOutlined className="info-icon price-icon" />
                    <div className="info-content">
                      <span className="info-label">Monthly Price</span>
                      <span className="info-value price-value">
                        €{(Number(eligibleUser.contract?.plan.price) - 4).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card
                  title={
                    <Space>
                      <PhoneOutlined />
                      <span>Communication</span>
                    </Space>
                  }
                  className="detail-card communication-card"
                >
                  <div className="info-item">
                    <PhoneOutlined className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">Bulgaria Calls</span>
                      <Tag style={{ fontSize: 15, borderRadius: 12, padding: '5px 10px 5px 10px' }} color="blue">{eligibleUser.contract?.plan.minutesInBG} min</Tag>
                    </div>
                  </div>

                  <div className="info-item">
                    <PhoneOutlined className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">EU Calls</span>
                      <Tag style={{ fontSize: 15, borderRadius: 12, padding: '5px 10px 5px 10px' }} color="green">{eligibleUser.contract?.plan.minutesInEU} min</Tag>
                    </div>
                  </div>

                  <div className="info-item">
                    <WifiOutlined className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">Data</span>
                      <Tag style={{ fontSize: 15, borderRadius: 12, padding: '5px 10px 5px 10px' }} color="purple">
                        {eligibleUser.contract?.plan.MB} MB - {eligibleUser.contract?.plan.MBps} Mbps
                      </Tag>
                    </div>
                  </div>
                </Card>

                {eligibleUser.contract?.device && (
                  <Card
                    title={
                      <Space>
                        <MobileOutlined />
                        <span>Device</span>
                      </Space>
                    }
                    className="detail-card device-card"
                  >
                    <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                      <img
                        src={eligibleUser.contract.device.mainImage}
                        className='device-image'

                      />
                      {eligibleUser.contract.typeOfPayment.includes('Monthly') ? (
                        <div className="info-item">

                          <EuroCircleOutlined className="info-icon" />
                          <div className="info-content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span className="info-label" style={{
                              fontWeight: 500,
                              fontSize: 18,
                              color: '#666'
                            }}>{eligibleUser.contract.device.model}</span>
                            <span className="info-label">{eligibleUser.contract.typeOfPayment}</span>
                            <Tag color="orange">
                              €{Math.ceil(
                                (eligibleUser.contract.device.price -
                                  eligibleUser.contract.plan.discountForDevice) /
                                24
                              )}/month
                            </Tag>
                          </div>
                        </div>
                      ) : (
                        <div className="info-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span className="info-label" style={{
                            fontWeight: 500,
                            fontSize: 18,
                            color: '#666'
                          }}>{eligibleUser.contract.device.model}</span>
                          <div className="info-content">
                            <span className="info-label">{eligibleUser.contract.typeOfPayment}</span>
                            <Tag color="orange">
                              €{eligibleUser.contract.device.price}
                            </Tag>

                          </div>

                        </div>

                      )}

                    </div>



                  </Card>
                )}
                <Card
                  title={
                    <Space>
                      <FilePdfOutlined className="pdf-icon" />
                      <span>Contract</span>
                    </Space>
                  }
                  className="detail-card communication-card"
                >
                  <div className="download-content">
                    <h3 style={{
                      fontWeight: 500,
                      fontSize: 18,
                      color: '#666'
                    }}>Contract Document</h3>
                    <p>Download your signed contract</p>
                    <Button
                      style={{ padding: '20px 20px 20px 20px', borderRadius: 12, marginTop: 65, fontSize: 18 }}
                      type="primary"
                      icon={<DownloadOutlined />}
                      href={contractPDF}
                      target="_blank"
                      download
                      className="download-btn"
                    >
                      Download PDF
                    </Button>
                  </div>

                </Card>

              </div>
            </div>
          ) : (
            <div className="no-contract-section">
              <Card className="no-contract-card">
                <div className="no-contract-content">
                  <Result
                    status="404"
                    title="No Active Contract"
                    subTitle="It seems you haven't signed a contract yet!"
                    extra={
                      <div className="user-info">
                        <Space direction="vertical" size="middle">
                          <div className="contact-info">
                            <PhoneOutlined /> {userContext?.user?.phoneNumber}
                          </div>
                          <div className="contact-info">
                            @ {userContext?.user?.email}
                          </div>
                        </Space>
                      </div>
                    }
                  />
                  <div className="cta-section">
                    <h3>Ready to get started?</h3>
                    <p>Dive into the best telecom experience!</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {platformContext?.streamingPlatform.id && (
            <div className="streaming-section">
              <Divider className="section-divider">
                <h2 className="section-title">
                  <CheckCircleOutlined /> Streaming Platform
                </h2>
              </Divider>

              <Card className="streaming-card">
                <div className="streaming-content">
                  <div className="platform-info">
                    <div className="platform-header">
                      <img
                        src={toggleImg()}
                        alt="Platform logo"
                        className="platform-logo"
                      />
                      <Tag
                        color={getPackageTypeColor(platformContext.streamingPlatform.packageType)}
                        className="package-tag"
                      >
                        {platformContext?.streamingPlatform.packageType}
                      </Tag>

                    </div>

                    <div className="platform-preferences">
                      <h4>Included Features:</h4>
                      <div className="preferences-list">
                        {platformContext?.streamingPlatform?.platformPreferences
                          .split(',')
                          .map((preference, index) => (
                            <Tag key={index} className="preference-tag">
                              <CheckCircleOutlined /> {preference.trim()}
                            </Tag>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="platform-benefits">
                    <Card size="small" className="benefit-card">
                      {eligibleUser?.contract && (
                        <div className="benefit-item free-year">
                          <PercentageOutlined className="benefit-icon" />
                          <span>First Year FREE</span>
                        </div>
                      )}
                      <div className="benefit-item">
                        <CalendarOutlined className="benefit-icon" />
                        <span>24 Month Contract</span>
                      </div>
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        href={contract}
                        target="_blank"
                        download
                        className="contract-link"
                      >
                        Download Contract
                      </Button>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AccountPage;