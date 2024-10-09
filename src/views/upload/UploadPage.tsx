import CreatePlanForm from '../../components/upload/create-plan-form/CreatePlanForm';
import UploadDeviceForm from '../../components/upload/upload-new-device/UploadDeviceForm';
import './upload-page.scss';

function UploadPage() {
  return (
    <div className='upload-body'>
      <div className='form-body'>
        <CreatePlanForm />
      </div>
      <div className='form-body'>
        <UploadDeviceForm />
      </div>
    </div>
  );
}

export default UploadPage;
