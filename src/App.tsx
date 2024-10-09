import axios from 'axios';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import { DeviceContext } from './context/PickedDeviceContext.ts';
import { User } from './interfaces/user.ts';
import Navbar from './components/navbar/Navbar';
import HomePage from './views/home/HomePage.tsx';
import UploadPage from './views/upload/UploadPage.tsx';
import DevicesPage from './views/devices/DevicesPage.tsx';
import PlansPage from './views/plans/PlansPage.tsx';
import SingContractPage from './views/sing-contract/SignContractPage.tsx';
import LoginPage from './views/login/LoginPage.tsx';
import RegisterPage from './views/register/RegisterPage.tsx';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(false);
  const [device, setDevice] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Not authenticated');
      }
    };

    fetchUser();
  }, [session]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user, session]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, setSession }}>
        <DeviceContext.Provider
          value={{ isDevicePicked: device, setDevicePicked: setDevice }}
        >
          <Navbar />
          <Routes>
            <Route
              path='/register'
              element={<RegisterPage />}
            />
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/upload'
              element={<UploadPage />}
            />
            <Route
              path='/devices'
              element={<DevicesPage />}
            />
            <Route
              path='/plans'
              element={<PlansPage />}
            />
            <Route
              path='/signContract/:contractId'
              element={<SingContractPage />}
            />
          </Routes>
        </DeviceContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
