import { createContext } from 'react';
import { UserState } from '../interfaces/user';

export const UserContext = createContext<UserState | null>(null);
