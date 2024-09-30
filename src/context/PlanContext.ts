import { createContext } from 'react';
import { AllPlans } from '../interfaces/plan';

export const AllPlansContext = createContext<AllPlans | null>(null);
