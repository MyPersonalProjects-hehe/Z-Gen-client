import { createContext } from 'react';

interface DeviceState {
  isDevicePicked: boolean | null;
  setDevicePicked: (device: boolean) => void;
}

export const DeviceContext = createContext<DeviceState | null>(null);
