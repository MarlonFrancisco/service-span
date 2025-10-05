import { ISearchStore } from './search.types';

export const fetchSearchResultAction =
  (set: (state: Partial<ISearchStore>) => void) => () => {
    set({ searchResults: [] });
  };
