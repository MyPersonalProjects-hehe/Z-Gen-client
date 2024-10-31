import DeviceLongForm from './DeviceLongForm';
import DeviceShortForm from './DeviceShortForm';

function UploadDeviceForm() {
  return (
    <div>
      <h1>create</h1>
      <div className='forms-body'>
        <DeviceLongForm></DeviceLongForm>
        <DeviceShortForm></DeviceShortForm>
      </div>
    </div>
  );
}

export default UploadDeviceForm;
