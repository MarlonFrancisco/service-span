import { TStoreAction } from '@/types/store.types';
import { ISearchStore, IStoreSearchListItem } from './search.types';

export const setIsMobileSearchOpenAction: TStoreAction<ISearchStore, boolean> =
  (set) => async (isOpen) => {
    set({ isMobileSearchOpen: isOpen });
  };

export const setSelectedStoreAction: TStoreAction<
  ISearchStore,
  IStoreSearchListItem
> = (set) => async (selectedStore) => {
  set({ selectedStore });
};
