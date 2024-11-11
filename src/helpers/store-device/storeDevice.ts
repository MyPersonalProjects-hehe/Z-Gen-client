import { Device } from '../../interfaces/device';
import { openNotification } from '../notifications-functions/openNotification';

interface storeChosenDeviceProps {
  device: Device;
  userContext: any;
  eligibilityContext: any;
  deviceContext: any;
  api: any;
  iconSuccess: any;
  iconError: any;
}

export const storeChosenDevice = (param: storeChosenDeviceProps) => {
  if (
    param.device &&
    param.userContext?.user &&
    param.eligibilityContext?.isEligible
  ) {
    localStorage.setItem('device', JSON.stringify(param.device));
    param.deviceContext?.setDevicePicked((prev: boolean) => !prev);
    openNotification({
      api: param.api,
      icon: param.iconSuccess,
      message: 'Success',
      description: 'Device stored!',
    });
  } else if (!param.eligibilityContext?.isEligible && param.userContext?.user) {
    openNotification({
      api: param.api,
      icon: param.iconError,
      message: 'Warning',
      description: 'You are not eligible for device purchasing!',
    });
  } else {
    openNotification({
      api: param.api,
      icon: param.iconError,
      message: 'Warning',
      description: 'Please login to store device!',
    });
  }
};
