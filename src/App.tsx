import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import './App.scss';
import Home from './views/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
