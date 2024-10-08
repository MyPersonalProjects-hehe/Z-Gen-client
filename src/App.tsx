import { Routes, Route } from 'react-router-dom';
import { User, UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import Register from './components/register/Register';
import Home from './views/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import { ConfigProvider } from 'antd';
import Devices from './views/devices/Devices.tsx';
import Plans from './views/plans/Plans.tsx';
import CreatePlan from './views/create-plan/CreatePlan.tsx';
import axios from 'axios';
import './App.scss';
import SingContract from './views/sing-contract/SignContract.tsx';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(false);

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'white',
            },
          }}
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
              path='/createPlan'
              element={<CreatePlan />}
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
        </ConfigProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
