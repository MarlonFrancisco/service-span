import { ISearchFilters } from '@/types/layout/search.types';
import { TStoreSet } from '@/types/store.types';
import { ISearchStore } from './search.types';

export const fetchSearchResultAction = (set: TStoreSet<ISearchStore>) => () => {
  set({ searchResults: [] });
};

export const setIsMobileSearchOpenAction =
  (set: TStoreSet<ISearchStore>) => (isOpen: boolean) => {
    set({ isMobileSearchOpen: isOpen });
  };

export const setSearchFiltersAction =
  (set: TStoreSet<ISearchStore>) => (filters: ISearchFilters) => {
    set({ searchFilters: filters });
  };
