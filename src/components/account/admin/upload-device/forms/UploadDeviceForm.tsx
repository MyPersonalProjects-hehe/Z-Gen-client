import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../constants/ServerURL';
import DeviceShortForm from './DeviceShortForm';
import DeviceLongForm from './DeviceLongForm';

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
