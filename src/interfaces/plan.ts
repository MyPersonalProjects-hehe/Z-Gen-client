import { Key } from 'react';

export interface Plan {
  _id: Key | null | undefined;
  nameOfPlan: string;
  typeOfClient: string;
  typeOfPlan: string;
  minutesInBG: any;
  minutesInEU: number;
  discountForDevice: number;
  MB: any;
  MBps: number;
  price: string;
  cards: string;
}

export interface AllPlans {
  plans: Plan[];
}
