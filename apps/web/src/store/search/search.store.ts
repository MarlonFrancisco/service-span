import { create } from 'zustand';
import { fetchSearchResultAction } from './search.actions';
import { ISearchStore } from './search.types';

const useSearchStore = create<ISearchStore>((set) => {
  const isSearchPage = false;

  return {
    searchResults: [],
    fetchingStatus: 'idle',
    showFilters: false,
    showSearchBar: isSearchPage,
    hasActiveFilters: false,
    fetchSearchResultAction: fetchSearchResultAction(set),
  };
});

export default useSearchStore;
