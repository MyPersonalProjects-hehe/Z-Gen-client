import axios from 'axios';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { User, UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import Register from './components/register/Register';
import Home from './views/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Devices from './views/devices/Devices.tsx';
import Plans from './views/plans/Plans.tsx';
import SingContract from './views/sing-contract/SignContract.tsx';
import { DeviceContext } from './context/PickedDeviceContext.ts';
import Upload from './views/upload/Upload.tsx';

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
              element={<Register />}
            />
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/upload'
              element={<Upload />}
            />
            <Route
              path='/devices'
              element={<Devices />}
            />
            <Route
              path='/plans'
              element={<Plans />}
            />
            <Route
              path='/signContract/:contractId'
              element={<SingContract />}
            />
          </Routes>
        </DeviceContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
