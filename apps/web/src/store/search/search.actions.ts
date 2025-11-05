import { TStoreSet } from '@/types/store.types';
import { ISearchStore } from './search.types';

export const setIsMobileSearchOpenAction =
  (set: TStoreSet<ISearchStore>) => (isOpen: boolean) => {
    set({ isMobileSearchOpen: isOpen });
  };
