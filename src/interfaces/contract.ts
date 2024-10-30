import { Device } from './device';
import { Plan } from './plan';

export interface Contract {
  fullName: String;
  address: String;
  delivery: String;
  device: Device;
  plan: Plan;
  email: String;
  paperContract: Boolean;
  typeOfPayment: String;
}

export default Contract;
