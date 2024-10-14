import { createContext } from 'react';

interface DeviceState {
  isDevicePicked: boolean | null;
  setDevicePicked: (device: boolean | ((device: boolean) => boolean)) => void;
}

export const DeviceContext = createContext<DeviceState | null>(null);
