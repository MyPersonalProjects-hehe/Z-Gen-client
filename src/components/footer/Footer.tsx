import './footer.scss';
import logo from '../../assets/footer-logo.png';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div className='footer-body'>
      <img
        src={logo}
        alt='logo'
      />
      <div className='info'>
        <div className='about__us'>
          <h2>About Us:</h2>
          <br />
          <p>
            ZGen is a cutting-edge telecom provider, delivering reliable,
            high-speed connectivity to empower businesses and individuals. Our
            mission is to keep you connected with innovative solutions that meet
            the demands of a digital world.
          </p>
        </div>
        <div className='contact'>
          <h2>Contacts:</h2>
          <br />
          <span>
            <a href='mailto:jechevatanq@gmail.com'>jechevatanq@gmail.com</a>
          </span>
        </div>
        <div className='social__links'>
          <h2>Social Links:</h2>
          <br />
          <span>
            <GithubOutlined style={{ fontSize: 30, marginRight: 5 }} />{' '}
            <a
              href='https://github.com/TanyaZhecheva'
              target='_blank'
            >
              https://github.com/TanyaZhecheva
            </a>
          </span>
          <br />
          <span>
            <LinkedinOutlined style={{ fontSize: 30, marginRight: 5 }} />
            <a
              href='https://www.linkedin.com/in/tanya-zhecheva-a4b550304/'
              target='_blank'
            >
              https://www.linkedin.com/in/tanya-zhecheva-a4b550304/
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
