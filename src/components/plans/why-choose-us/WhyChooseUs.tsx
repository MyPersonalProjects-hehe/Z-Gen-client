import './why-choose-us.scss';

function WhyChooseUs() {
  return (
    <div className='time-line'>
      <h1 className='heading linear-text'>Why choose us?</h1>
      <div className='first__node'>
        <h2>
          Every <span className='linear-text'>Unlimited Plan</span> MB and calls
          can be used free for six months in Europe.
        </h2>
        <img
          className='first__image'
          src='https://cdn.dribbble.com/users/1449995/screenshots/5678125/attachments/1226582/dribbble_shot_large.png'
          alt='image'
        />
      </div>
      <div className='second__node'>
        <h2>
          No more frequent calls for retention deals! <br /> Since we are{' '}
          <span className='linear-text'>Gen-z best choice</span>, most of our
          services are entirely from your mobile device!{' '}
        </h2>
        <img
          src='https://api.time.com/wp-content/uploads/2015/08/smartphone-stress-email-cortisol.jpg?quality=85&w=2400'
          alt='image'
        />
      </div>
      <div className='node'>
        <h2 className='last-text'>
          Become our regular client and we will provide you with the best
          discount for Plans
        </h2>
      </div>
    </div>
  );
}

export default WhyChooseUs;
