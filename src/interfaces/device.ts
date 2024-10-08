import { Key } from 'react';

export interface Device {
  _id: Key | null | undefined;
  RAM: string;
  model: string;
  image: string;
  price: any;
}

export interface AllDevices {
  device: Device[];
}
