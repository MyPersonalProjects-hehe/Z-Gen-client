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
  bestPlanId: any;
  navigate: any;
}

export const storeChosenDevice = (param: storeChosenDeviceProps) => {
  /**If there is a logged user, is eligible,
   * and the button 'Get offer' is clicked*/
  if (
    param.device &&
    param.userContext?.user &&
    param.eligibilityContext?.isEligible &&
    param.bestPlanId !== ''
  ) {
    localStorage.setItem('device', JSON.stringify(param.device));
    localStorage.setItem('plan', JSON.stringify(param.bestPlanId));
    param.deviceContext?.setDevicePicked((prev: boolean) => !prev);
    param.navigate(`/signContract/${param.bestPlanId}`);
    /**If there is a logged user but he is not eligible for contract signing */
  } else if (!param.eligibilityContext?.isEligible && param.userContext?.user) {
    openNotification({
      api: param.api,
      icon: param.iconError,
      message: 'Warning',
      description: 'You are not eligible for device purchasing!',
    });
    /**If there is a logged user and the button 'Pick device' is clicked
     * (there is no best plan id stored)
     */
  } else if (param.bestPlanId === '') {
    localStorage.setItem('device', JSON.stringify(param.device));
    param.deviceContext?.setDevicePicked((prev: boolean) => !prev);

    openNotification({
      api: param.api,
      icon: param.iconSuccess,
      message: 'Success',
      description: 'Device stored!',
    });
  } else {
    /**No logged user */
    openNotification({
      api: param.api,
      icon: param.iconError,
      message: 'Warning',
      description: 'Please login!',
    });
  }
};
