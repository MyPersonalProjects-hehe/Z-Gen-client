import CreatePlanForm from '../../components/upload/create-plan-form/CreatePlanForm';
import DeviceLongForm from '../../components/upload/upload-device/DeviceLongForm';
import DeviceShortForm from '../../components/upload/upload-device/DeviceShortForm';
import './upload-page.scss';

function UploadPage() {
  return (
    <div className='upload-body'>
      <div className='form__body'>
        <CreatePlanForm />
      </div>
      <div className='form__body'>
        <DeviceShortForm />
      </div>
      <div className='form__body'>
        <DeviceLongForm />
      </div>
    </div>
  );
}

export default UploadPage;
