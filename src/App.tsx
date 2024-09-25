import { Routes, Route } from 'react-router-dom';
import { User, UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Register from './components/register/Register';
import Home from './views/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';

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
    console.log(user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user, session]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, setSession }}>
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
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
