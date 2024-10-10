import { Key } from 'react';

export interface DeviceFullInfo {
  _id: Key | null;
  model: string;
  camera: string;
  selfieCamera: string;
  operationSystem: string;
  processor: string;
  batteryCapacity: string;
  corpus: string;
  functions: string;
  waterProof: string;
  weight: string;
}
