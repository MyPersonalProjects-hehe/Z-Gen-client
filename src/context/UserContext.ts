import { createContext } from 'react';

export interface User {
  email: '';
  id: '';
  phoneNumber: '';
  username: '';
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  setSession: (session: boolean) => void;
}

export const UserContext = createContext<UserState | null>(null);
