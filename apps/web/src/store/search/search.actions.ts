import { TStoreSet } from '@/types/store.types';
import { ISearchStore } from './search.types';

export const fetchSearchResultAction = (set: TStoreSet<ISearchStore>) => () => {
  set({ searchResults: [] });
};
