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
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [dateOfEligibility, setDateOfEligibility] = useState<Date | string>('');
  const [isDevicePicked, setDevicePicked] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [session, setSession] = useState(false);
  const [planId, setPlanId] = useState('');

  useEffect(() => {
    const userUnparsed = localStorage.getItem('user');
    const user = userUnparsed ? JSON.parse(userUnparsed) : '';
    if (user) {
      const setItems = async () => {
        const response = await axios.get(
          SERVER_URL(`fetchContract/${user.email}`),
          {
            withCredentials: true,
          }
        );
        const planUnparsed = localStorage.getItem('plan');
        const planId = planUnparsed ? JSON.parse(planUnparsed) : '';
        setPlanId(planId);
        setContract(response.data.contract[0]);
        setUser(user);

        /**Checking every logged user if he is eligible
         * for new contract signing
         */
        if (response.data.contract.length > 0) {
          const dateOfLogging = new Date();
          const dateOfContract = new Date(response.data.contract[0].date);
          const dateOfEligibility = new Date(dateOfContract);
          dateOfEligibility.setMonth(dateOfContract.getMonth() + 2);
          setDateOfEligibility(dateOfEligibility.toLocaleDateString());

          /**If there is a signed contract with eligibility date
           * and without eligibility date
           */
          user.email === response.data.contract[0].email &&
          dateOfLogging.getTime() === dateOfEligibility.getTime()
            ? setIsEligible(true)
            : setIsEligible(false);
        } else {
          /**If there is no signed contract */
          setIsEligible(true);
        }
      };
      setItems();
    }
  }, [session, isDevicePicked]);

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
            value={{
              isDevicePicked: isDevicePicked,
              setDevicePicked: setDevicePicked,
            }}
          >
            <ScrollTop>
              {planId && user && isEligible && (
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
