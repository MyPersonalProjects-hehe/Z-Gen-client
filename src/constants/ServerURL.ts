import { config } from 'dotenv';

config();

export const SERVER_URL = (END_POINT: string) =>
  `${process.env.REACT_APP_BACKEND_URL}/${END_POINT}`;
