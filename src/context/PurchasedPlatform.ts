import { createContext } from 'react';

interface PurchasedPlatformState {
  isPlatformPurchased: boolean;
  setIsPlatformPurchased: (state: boolean) => void;
  streamingPlatform: {
    packageType: string;
    platformName: string;
    price: string;
    userId: string;
  };
}

export const purchasedPlatformContext =
  createContext<PurchasedPlatformState | null>(null);
