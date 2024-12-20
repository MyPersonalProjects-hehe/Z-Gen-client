import { Key } from 'react';

export interface Device {
  _id: Key | null | undefined;
  RAM: string;
  model: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  price: any;
}

export interface AllDevices {
  device: Device[];
}
