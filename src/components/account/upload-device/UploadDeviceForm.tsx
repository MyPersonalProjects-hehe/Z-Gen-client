import axios from 'axios';
import { useEffect, useState } from 'react';
import DeviceLongForm from './forms/DeviceLongForm';
import DeviceShortForm from './forms/DeviceShortForm';
import { SERVER_URL } from '../../../constants/ServerURL';

function UploadDeviceForm() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchAllModels = async () => {
      try {
        const response = await axios.get(SERVER_URL('getAllModels'), {
          withCredentials: true,
        });
        setModels(response.data.models);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllModels();
  }, []);

  return (
    <div>
      <h1>create</h1>
      <div className='forms-body device-upload'>
        <DeviceShortForm />
        <DeviceLongForm models={models} />
      </div>
    </div>
  );
}

export default UploadDeviceForm;
