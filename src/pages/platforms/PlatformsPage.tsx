import './platforms-page.scss';
import strangerThingsImg from '../../assets/movie-posters/stranger_things.jpg';
import squidGamesImg from '../../assets/movie-posters/squid_games.jpg';
import wednesdayImg from '../../assets/movie-posters/wednesday.png';
import netflixLogo from '../../assets/logos/netflix.png';
import hboLogo from '../../assets/logos/hbo.png';
import disneyLogo from '../../assets/logos/disney.png';
import { Button } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { purchasedPlatformContext } from '../../context/PurchasedPlatform';

function PlatformsPage() {
  const platformContext = useContext(purchasedPlatformContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleBuyBtn = (
    platformName: string,
    packageType: string,
    price: number,
    id: string
  ) => {
    userContext?.user
      ? navigate(`/platformSign/${platformName}/${packageType}/${price}/${id}`)
      : navigate('/signUp');
  };

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
        <h2>Streaming platforms</h2>
        <div className='netflix__platform'>
          <img
            src={netflixLogo}
            alt='netflix'
          />
          <span className='package'>
            <h3>Basic</h3>
            <ul>
              <li>Unlimited ad-free movies, TV shows, and mobile games</li>
              <li>Watch on 1 supported device at a time</li>
              <li>Watch in 720p (HD)</li>
              <li>Download on 1 supported device at a time</li>
            </ul>
            <p>
              3.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn'
              type='primary'
              style={{
                color: 'black',
              }}
              disabled={platformContext?.streamingPlatform.id === 'n-b'}
              onClick={() => handleBuyBtn('netflix', 'Basic', 3.99, 'n-b')}
            >
              {platformContext?.streamingPlatform.id === 'n-b'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
          <span className='package'>
            <h3>Standard</h3>
            <ul>
              <li>Unlimited ad-free movies, TV shows, and mobile games</li>
              <li>Watch on 2 supported device at a time</li>
              <li>Watch in 1080p (Full HD)</li>
              <li>Download on 2 supported device at a time</li>
            </ul>
            <p>
              5.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn standard'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'n-s'}
              onClick={() => handleBuyBtn('netflix', 'Standard', 5.99, 'n-s')}
            >
              {platformContext?.streamingPlatform.id === 'n-s'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
          <span className='package'>
            <h3>Premium</h3>
            <ul>
              <li>Unlimited ad-free movies, TV shows, and mobile games</li>
              <li>Watch on 4 supported device at a time</li>
              <li>Watch in 4K (Ultra HD) + HDR</li>
              <li>Download on 6 supported device at a time</li>
            </ul>
            <p>
              7.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn premium'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'n-p'}
              onClick={() => handleBuyBtn('netflix', 'Premium', 7.99, 'n-p')}
            >
              {platformContext?.streamingPlatform.id === 'n-p'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
        </div>
        <div className='hbo__platform'>
          <img
            src={hboLogo}
            alt='hbo'
          />
          <span className='package'>
            <h3>Basic</h3>
            <ul>
              <li>Stream on 2 devices at once</li>
              <li>Full HD video resolution</li>
              <li>30 downloads</li>
              <li>Ad-free</li>
            </ul>
            <p>
              5.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'hbo-b'}
              onClick={() => handleBuyBtn('hbo-max', 'Basic', 5.99, 'hbo-b')}
            >
              {platformContext?.streamingPlatform.id === 'hbo-b'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
          <span className='package'>
            <h3>Standard</h3>
            <ul>
              <li>Stream on 4 devices at once</li>
              <li>4K UHD & Dolby Atmos as available</li>
              <li>100 downloads (limits apply)</li>
              <li>Ad-free</li>
            </ul>
            <p>
              7.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn standard'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'hbo-s'}
              onClick={() => handleBuyBtn('hbo-max', 'Standard', 7.99, 'hbo-s')}
            >
              {platformContext?.streamingPlatform.id === 'hbo-s'
                ? 'Purchased'
                : 'Buy'}
              Buy
            </Button>
          </span>
          <span className='package'>
            <h3>Premium</h3>
            <ul>
              <li>Stream on 6 devices at once</li>
              <li>4K UHD & Dolby Atmos as available</li>
              <li>200 downloads (limits apply)</li>
              <li>Ad-free</li>
            </ul>
            <p>
              7.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn premium'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'hbo-p'}
              onClick={() => handleBuyBtn('hbo-max', 'Premium', 7.99, 'hbo-p')}
            >
              {platformContext?.streamingPlatform.id === 'hbo-p'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
        </div>
        <div className='disney__platform'>
          <img
            src={disneyLogo}
            alt='hbo'
          />
          <span className='package'>
            <h3>Basic</h3>
            <ul>
              <li>Enjoy in up to 1080p Full HD video</li>
              <li>Supports up to 5.1 audio</li>
              <li>Stream on 2 devices at a time</li>
              <li>Ad-free movies and series</li>
              <li>Downloads on up to 10 devices</li>
            </ul>
            <p>
              6.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'disney-b'}
              onClick={() =>
                handleBuyBtn('disney-plus', 'Basic', 6.99, 'disney-b')
              }
            >
              {platformContext?.streamingPlatform.id === 'disney-b'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
          <span className='package'>
            <h3>Standard</h3>
            <ul>
              <li>Experience in up to 4K UHD and HDR video</li>
              <li>Immersive sound with up to Dolby Atmos audio</li>
              <li>Stream on 4 devices at a time</li>
              <li>Ad-free movies and series</li>
              <li>Downloads on up to 10 devices</li>
            </ul>
            <p>
              9.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn standard'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'disney-s'}
              onClick={() =>
                handleBuyBtn('disney-plus', 'Standard', 9.99, 'disney-s')
              }
            >
              {platformContext?.streamingPlatform.id === 'disney-s'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
          <span className='package'>
            <h3>Extra member</h3>
            <ul>
              <li>
                Enjoy Disney+ with a family member or friend even if they are
                outside your household
              </li>
              <li>Stream on one device at a time</li>
              <li>Create and access only one profile</li>
              <li>
                Access the same content and features as the account holder
              </li>
            </ul>

            <p>
              2.99 <EuroCircleOutlined className='euro-icon' />
            </p>
            <Button
              className='btn buy-btn premium'
              type='primary'
              disabled={platformContext?.streamingPlatform.id === 'disney-p'}
              onClick={() =>
                handleBuyBtn('disney-plus', 'Premium', 2.99, 'disney-p')
              }
            >
              {platformContext?.streamingPlatform.id === 'disney-p'
                ? 'Purchased'
                : 'Buy'}
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlatformsPage;
