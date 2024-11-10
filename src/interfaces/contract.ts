import { Device } from './device';
import { Plan } from './plan';

export interface Contract {
  _id: string;
  fullName: String;
  address: String;
  delivery: String;
  device: Device;
  plan: Plan;
  email: String;
  paperContract: Boolean;
  typeOfPayment: String;
  date: any;
}

export default Contract;
