import './platforms-page.scss';
import axios from 'axios';
import strangerThingsImg from '../../assets/movie-posters/stranger_things.jpg';
import squidGamesImg from '../../assets/movie-posters/squid_games.jpg';
import wednesdayImg from '../../assets/movie-posters/wednesday.png';
import netflixLogo from '../../assets/logos/netflix.png';
import hboLogo from '../../assets/logos/hbo.png';
import disneyLogo from '../../assets/logos/disney.png';
import { Button } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { PurchasedPlatformContext } from '../../context/PurchasedPlatformContext';
import { SERVER_URL } from '../../constants/ServerURL';
import { StreamingPlatform } from '../../interfaces/streamingPlatform';

function PlatformsPage() {
  const platformContext = useContext(PurchasedPlatformContext);
  const userContext = useContext(UserContext);
  const [streamingPlatforms, setStreamingPlatforms] = useState<
    StreamingPlatform[] | []
  >([]);
  const navigate = useNavigate();
  console.log(platformContext);

  const handleBuyBtn = (
    platformName: string,
    packageType: string,
    price: string,
    id: string
  ) => {
    userContext?.user
      ? navigate(`/platformSign/${platformName}/${packageType}/${price}/${id}`)
      : navigate('/signUp');
  };

  const toggleImg = (logo: string) => {
    if (logo === 'netflixLogo') return netflixLogo;
    if (logo === 'hboLogo') return hboLogo;
    if (logo === 'disneyLogo') return disneyLogo;
  };

  useEffect(() => {
    try {
      const fetchPlatforms = async () => {
        const response = await axios.get(SERVER_URL('getPlatforms'), {
          withCredentials: true,
        });
        if (response.status === 200) {
          setStreamingPlatforms(response.data.platforms);
        }
      };

      fetchPlatforms();
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className='platforms-body'>
      <h1 className='poster-heading'>
        You are not ready for <span className='colored-year'>2025</span>{' '}
      </h1>
      <div className='movie-posters'>
        <img
          src={strangerThingsImg}
          alt='img'
        />
        <img
          src={wednesdayImg}
          alt='img'
        />
        <img
          src={squidGamesImg}
          alt='img'
        />
      </div>

      <div className='streaming-platforms'>
        <h2>Streaming Platforms</h2>
        {streamingPlatforms &&
          streamingPlatforms.map(
            (platform: StreamingPlatform, index: number) => (
              <div
                key={index}
                className='platform'
              >
                <img
                  src={toggleImg(platform.logo)}
                  alt='logo'
                />
                <span className='package'>
                  <h3>Basic</h3>
                  <ul>
                    {platform.packageTypes.Basic.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            <p>
                              {
                                platform.packageTypes.Basic[
                                  platform.packageTypes.Basic.length - 1
                                ]
                              }
                              <EuroCircleOutlined className='euro-icon' />
                            </p>
                          ) : (
                            <li>{listOfPreferences}</li>
                          )}
                        </div>
                      )
                    )}
                  </ul>

                  <Button
                    className='btn buy-btn'
                    type='primary'
                    // disabled={platformContext?.streamingPlatform.id === 'n-b'}
                    onClick={() =>
                      handleBuyBtn(
                        platform.streamingPlatform,
                        'Basic',
                        platform.packageTypes.Basic[
                          platform.packageTypes.Basic.length - 1
                        ],
                        `${platform.streamingPlatform}-Basic`
                      )
                    }
                  >
                    Buy
                    {/* {platformContext?.streamingPlatform.id === 'n-b'
                ? 'Purchased'
                : 'Buy'} */}
                  </Button>
                </span>

                <span className='package'>
                  <h3>Standard</h3>
                  <ul>
                    {platform.packageTypes.Standard.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            <p>
                              {
                                platform.packageTypes.Standard[
                                  platform.packageTypes.Standard.length - 1
                                ]
                              }
                              <EuroCircleOutlined className='euro-icon' />
                            </p>
                          ) : (
                            <li>{listOfPreferences}</li>
                          )}
                        </div>
                      )
                    )}
                  </ul>
                  <Button
                    className='btn buy-btn standard'
                    type='primary'
                    // disabled={platformContext?.streamingPlatform.id === 'n-b'}
                    onClick={() =>
                      handleBuyBtn(
                        platform.streamingPlatform,
                        'Standard',
                        platform.packageTypes.Standard[
                          platform.packageTypes.Standard.length - 1
                        ],
                        `${platform.streamingPlatform}-Standard`
                      )
                    }
                  >
                    Buy
                    {/* {platformContext?.streamingPlatform.id === 'n-b'
                ? 'Purchased'
                : 'Buy'} */}
                  </Button>
                </span>

                <span className='package'>
                  <h3>Premium</h3>
                  <ul>
                    {platform.packageTypes.Premium.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            <p>
                              {
                                platform.packageTypes.Premium[
                                  platform.packageTypes.Premium.length - 1
                                ]
                              }
                              <EuroCircleOutlined className='euro-icon' />
                            </p>
                          ) : (
                            <li>{listOfPreferences}</li>
                          )}
                        </div>
                      )
                    )}
                  </ul>
                  <Button
                    className='btn buy-btn premium'
                    type='primary'
                    // disabled={platformContext?.streamingPlatform.id === 'n-b'}
                    onClick={() =>
                      handleBuyBtn(
                        platform.streamingPlatform,
                        'Premium',
                        platform.packageTypes.Premium[
                          platform.packageTypes.Premium.length - 1
                        ],
                        `${platform.streamingPlatform}-Premium`
                      )
                    }
                  >
                    Buy
                    {/* {platformContext?.streamingPlatform.id === 'n-b'
                ? 'Purchased'
                : 'Buy'} */}
                  </Button>
                </span>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default PlatformsPage;
