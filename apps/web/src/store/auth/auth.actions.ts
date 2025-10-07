import { TStoreSet } from '@/types/store.types';
import { IAuthState } from './auth.types';

export const toggleAuthAction =
  (set: TStoreSet<IAuthState>) => (isOpen: boolean) => {
    set({ isOpen });
  };
