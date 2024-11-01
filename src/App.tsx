import axios from 'axios';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import { DeviceContext } from './context/PickedDeviceContext.ts';
import { User } from './interfaces/user.ts';
import ScrollTop from './helpers/scroll/ScrollTop.tsx';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage.tsx';
import DevicesPage from './pages/devices/DevicesPage.tsx';
import PlansPage from './pages/plans/PlansPage.tsx';
import SingContractPage from './pages/sing-contract/SignContractPage.tsx';
import CharacteristicsPage from './pages/characteristics/CharacteristicPage.tsx';
import AccountPage from './pages/account/AccountPage.tsx';
import CreatePlanForm from './components/account/create-plan/CreatePlanForm.tsx';
import UploadDeviceForm from './components/account/upload-device/UploadDeviceForm.tsx';
import SignUpPage from './pages/sign-up/SignUpPage.tsx';

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
      } catch (error: any) {
        console.log(error.response.data.message);
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
                path='/signUp'
                element={<SignUpPage />}
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
                element={<AccountPage />}
              />
            </Routes>
          </ScrollTop>
        </DeviceContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
