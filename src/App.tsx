import axios from 'axios';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import { DeviceContext } from './context/PickedDeviceContext.ts';
import { User } from './interfaces/user.ts';
import Navbar from './components/navbar/Navbar';
import HomePage from './views/home/HomePage.tsx';
import DevicesPage from './views/devices/DevicesPage.tsx';
import PlansPage from './views/plans/PlansPage.tsx';
import SingContractPage from './views/sing-contract/SignContractPage.tsx';
import LoginPage from './views/login/LoginPage.tsx';
import CharacteristicsPage from './views/characteristics/CharacteristicPage.tsx';
import ScrollTop from './helpers/scroll/ScrollTop.tsx';
import Account from './views/account/Account.tsx';
import CreatePlanForm from './components/account/create-plan/CreatePlanForm.tsx';
import UploadDeviceForm from './components/account/upload-device/UploadDeviceForm.tsx';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(false);
  const [device, setDevice] = useState<boolean>(false);

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
          <ScrollTop>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/login'
                element={<LoginPage />}
              />
              <Route
                path='/createPlan'
                element={<CreatePlanForm />}
              />
              <Route
                path='/uploadDevice'
                element={<UploadDeviceForm />}
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
              <Route
                path='/characteristics/:deviceId'
                element={<CharacteristicsPage />}
              />
              <Route
                path='/account'
                element={<Account />}
              />
            </Routes>
          </ScrollTop>
        </DeviceContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
