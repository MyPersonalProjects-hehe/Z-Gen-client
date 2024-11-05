import { createContext } from 'react';
import Contract from '../interfaces/contract';

interface EligibleUserProps {
  isEligible: boolean;
  setIsEligible: (value: boolean) => void;
  contract: Contract | null;
  dateOfEligibility: any;
}

export const EligibleUser = createContext<EligibleUserProps | null>(null);
