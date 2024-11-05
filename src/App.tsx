import axios from 'axios';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';
import { useEffect, useState } from 'react';
import { DeviceContext } from './context/PickedDeviceContext.ts';
import { FloatButton, Tooltip } from 'antd';
import { EligibleUser } from './context/EligibleUser.ts';
import { User } from './interfaces/user.ts';
import Footer from './components/footer/Footer.tsx';
import ScrollTop from './helpers/scroll/ScrollTop.tsx';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage.tsx';
import DevicesPage from './pages/devices/DevicesPage.tsx';
import PlansPage from './pages/plans/PlansPage.tsx';
import SingContractPage from './pages/sing-contract/SignContractPage.tsx';
import CharacteristicsPage from './pages/characteristics/CharacteristicPage.tsx';
import AccountPage from './pages/account/AccountPage.tsx';
import SignUpPage from './pages/sign-up/SignUpPage.tsx';
import CreatePlanForm from './components/account/admin/create-plan/CreatePlanForm.tsx';
import UploadDeviceForm from './components/account/admin/upload-device/forms/UploadDeviceForm.tsx';
import { SERVER_URL } from './constants/ServerURL.ts';
import Contract from './interfaces/contract.ts';
import ResultPage from './pages/result/ResultPage.tsx';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(false);
  const [device, setDevice] = useState<boolean>(false);
  const [planId, setPlanId] = useState('');
  const [isEligible, setIsEligible] = useState(false);
  const [contract, setContract] = useState<Contract | null>(null);
  const [dateOfEligibility, setDateOfEligibility] = useState<Date | string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(SERVER_URL('user'), {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    fetchUser();
  }, [session, device, planId]);

  useEffect(() => {
    if (user) {
      const setItems = async () => {
        const response = await axios.get(
          SERVER_URL(`fetchContract/${user.email}`),
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('user', JSON.stringify(user));
        const planUnparsed = localStorage.getItem('plan');
        const planId = planUnparsed ? JSON.parse(planUnparsed) : '';
        setPlanId(planId);
        setContract(response.data.contract[0]);

        /**Checking every logged user if he is eligible
         * for new contract signing
         */
        if (response.data.contract.length > 0) {
          const dateOfLogging = new Date();
          const dateOfContract = new Date(response.data.contract[0].date);
          const dateOfEligibility = new Date(dateOfContract);
          dateOfEligibility.setMonth(dateOfContract.getMonth() + 2);
          setDateOfEligibility(dateOfEligibility.toLocaleDateString());

          if (
            user.email === response.data.contract[0].email &&
            dateOfLogging.getTime() === dateOfEligibility.getTime()
          ) {
            setIsEligible(true);
          } else {
            /**If there is a signed contract but its not the eligibility date */
            setIsEligible(false);
          }
        } else {
          /**If there is no signed contract */
          setIsEligible(true);
        }
      };
      setItems();
    } else {
      localStorage.removeItem('user');
    }
  }, [user, session]);

  return (
    <>
      <EligibleUser.Provider
        value={{
          isEligible: isEligible,
          setIsEligible: setIsEligible,
          contract: contract,
          dateOfEligibility: dateOfEligibility,
        }}
      >
        <UserContext.Provider value={{ user, setUser, setSession }}>
          <DeviceContext.Provider
            value={{ isDevicePicked: device, setDevicePicked: setDevice }}
          >
            <ScrollTop>
              {planId && user && (
                <Tooltip
                  placement='topLeft'
                  title='Signing contract in progress'
                >
                  <FloatButton
                    className='float-btn'
                    onClick={() => navigate(`/signContract/${planId}`)}
                    badge={{ count: 1 }}
                  />
                </Tooltip>
              )}
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
                  path='/result/:id'
                  element={<ResultPage />}
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
              <Footer />
            </ScrollTop>
          </DeviceContext.Provider>
        </UserContext.Provider>
      </EligibleUser.Provider>
    </>
  );
}

export default App;
