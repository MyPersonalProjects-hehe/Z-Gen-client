import { createContext } from 'react';
import { User } from '../interfaces/user';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  setSession: (session: boolean) => void;
}

export const UserContext = createContext<UserState | null>(null);
