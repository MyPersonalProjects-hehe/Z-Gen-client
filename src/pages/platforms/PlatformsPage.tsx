import './platforms-page.scss';
import axios from 'axios';
import strangerThingsImg from '../../assets/movie-posters/stranger_things.jpg';
import squidGamesImg from '../../assets/movie-posters/squid_games.jpg';
import wednesdayImg from '../../assets/movie-posters/wednesday.png';
import netflixLogo from '../../assets/logos/netflix.jpg';
import hboLogo from '../../assets/logos/hbo.png';
import disneyLogo from '../../assets/logos/disney.png';
import skeletonImage from '../../assets/skeleton.png';
import { Button, Spin } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants/ServerURL';
import { StreamingPlatform } from '../../interfaces/streamingPlatform';
import { PurchasedPlatformContext } from '../../context/PurchasedPlatformContext';

function PlatformsPage() {
  const userContext = useContext(UserContext);
  const platformContext = useContext(PurchasedPlatformContext);
  const [streamingPlatforms, setStreamingPlatforms] = useState<
    StreamingPlatform[] | []
  >([]);
  const navigate = useNavigate();
  /**Loading state */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchPlatforms = async () => {
        const response = await axios.get(SERVER_URL('getPlatforms'), {
          withCredentials: true,
        });
        if (response.status === 200) {
          setStreamingPlatforms(response.data.platforms);
          setLoading(false);
        }
      };

      fetchPlatforms();
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const handleBuyBtn = (
    platformNameParam: string,
    packageTypeParam: string,
    priceParam: string,
    id: string
  ) => {
    const pickedPlatform = streamingPlatforms
      .filter(
        (platform: StreamingPlatform) =>
          platform.streamingPlatform === platformNameParam
      )
      .map((packages: any) => {
        const pickedPackage = packages.packageTypes[packageTypeParam];
        return pickedPackage;
      });

    /**Passing on the platform preferences */
    userContext?.user
      ? navigate(
          `/platformSign/${platformNameParam}/${packageTypeParam}/${priceParam}/${id}/${pickedPlatform}`
        )
      : navigate('/signUp');
  };

  const toggleImg = (logo: string) => {
    if (logo === 'netflixLogo') return netflixLogo;
    if (logo === 'hboLogo') return hboLogo;
    if (logo === 'disneyLogo') return disneyLogo;
  };

  return (
    <div className='platforms-body'>
      <h1 className='poster-heading'>
        You are not ready for <span className='colored-year'>2025</span>{' '}
      </h1>
      <div className='movie__posters'>
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

      {platformContext?.streamingPlatform.id && (
        <div className='not-eligible'>
          <h1>
            You are not eligible for purchasing a platform!
            <br />
            You currently have an active contract.
          </h1>
        </div>
      )}

      <div className='streaming-platforms'>
        {loading ? (
          <div className='loading__state'>
            <Spin size='large'>Loading, please wait!</Spin>
          </div>
        ) : (
          streamingPlatforms.map(
            (platform: StreamingPlatform, index: number) => (
              <div
                key={index}
                className='platform'
              >
                <img
                  src={toggleImg(platform.logo)}
                  alt={skeletonImage}
                />
                <span className='package'>
                  <div className='purchased__package'>
                    {platformContext?.streamingPlatform.id ===
                      `${platform.streamingPlatform}-Basic` && (
                      <h3 className='badge'>Purchased</h3>
                    )}
                  </div>
                  <h3>Basic</h3>
                  <ul>
                    {platform.packageTypes.Basic.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            /**Last index is price of package */
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

                  {!platformContext?.streamingPlatform.id && (
                    /*If there isn`t an existing id the user is eligible
                    for platform purchasing
                   */
                    <Button
                      className='btn buy-btn basic'
                      type='primary'
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
                    </Button>
                  )}
                </span>

                <span className='package'>
                  <div className='purchased__package'>
                    {platformContext?.streamingPlatform.id ===
                      `${platform.streamingPlatform}-Standard` && (
                      <h3 className='badge'>Purchased</h3>
                    )}
                  </div>
                  <h3>Standard</h3>
                  <ul>
                    {platform.packageTypes.Standard.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            /**Last index is price of package */
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

                  {!platformContext?.streamingPlatform.id && (
                    <Button
                      className='btn buy-btn standard'
                      type='primary'
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
                    </Button>
                  )}
                </span>

                <span className='package'>
                  <div className='purchased__package'>
                    {platformContext?.streamingPlatform.id ===
                      `${platform.streamingPlatform}-Premium` && (
                      <h3 className='badge'>Purchased</h3>
                    )}
                  </div>
                  <h3>Premium</h3>
                  <ul>
                    {platform.packageTypes.Premium.map(
                      (listOfPreferences: string, index) => (
                        <div key={index}>
                          {listOfPreferences.includes('Price') ? (
                            /**Last index is price of package */
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

                  {!platformContext?.streamingPlatform.id && (
                    <Button
                      className='btn buy-btn premium'
                      type='primary'
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
                    </Button>
                  )}
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default PlatformsPage;
