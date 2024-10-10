import CreatePlanForm from '../../components/upload/create-plan-form/CreatePlanForm';
import DeviceLongForm from '../../components/upload/upload-device/DeviceLongForm';
import DeviceShortForm from '../../components/upload/upload-device/DeviceShortForm';
import './upload-page.scss';

function UploadPage() {
  return (
    <div className='upload-body'>
      <div className='form-body'>
        <CreatePlanForm />
      </div>
      <div className='form-body'>
        <DeviceShortForm />
      </div>
      <div className='form-body'>
        <DeviceLongForm />
      </div>
    </div>
  );
}

export default UploadPage;
