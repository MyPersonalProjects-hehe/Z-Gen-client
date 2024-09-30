import { Routes, Route } from 'react-router-dom';
import { User, UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Register from './components/register/Register';
import Home from './views/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import { ConfigProvider } from 'antd';
import CreatePlan from './views/createPlan/createPlan.tsx';
import Devices from './views/devices/Devices.tsx';
import Plans from './views/plans/Plans.tsx';
import { SERVER_URL } from './constants/ServerURL.ts';
import { AllPlansContext } from './context/PlanContext.ts';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(false);
  const [plans, setPlans] = useState([]);

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

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await axios.get(SERVER_URL('allPlans'));
        console.log(result.data.message);
        setPlans(result.data.message || []);
      } catch (error) {}
    };

    fetchAllPlans();
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, setSession }}>
        <AllPlansContext.Provider value={{ plans }}>
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
            </Routes>
          </ConfigProvider>
        </AllPlansContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
