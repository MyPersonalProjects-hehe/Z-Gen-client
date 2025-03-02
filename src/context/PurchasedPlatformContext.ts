import { createContext } from 'react';

interface PurchasedPlatformState {
  isPlatformPurchased: boolean;
  setIsPlatformPurchased: (state: boolean) => void;
  streamingPlatform: {
    packageType: string;
    platformName: string;
    price: string;
    id: string;
    userId: string;
    platformPreferences: string;
  };
}

export const PurchasedPlatformContext =
  createContext<PurchasedPlatformState | null>(null);
