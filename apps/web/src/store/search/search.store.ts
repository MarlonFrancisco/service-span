import { create } from 'zustand';
import {
  fetchSearchResultAction,
  setIsMobileSearchOpenAction,
  setSearchFiltersAction,
} from './search.actions';
import { ISearchStore } from './search.types';

const useSearchStore = create<ISearchStore>((set) => {
  return {
    searchResults: [],
    fetchingStatus: 'idle',
    showFilters: false,
    isMobileSearchOpen: false,
    searchFilters: {
      categories: [],
      priceRange: [0, 500],
      rating: 0,
      availability: 'any',
      query: '',
      location: '',
      date: undefined,
    },
    setSearchFilters: setSearchFiltersAction(set),
    setIsMobileSearchOpen: setIsMobileSearchOpenAction(set),
    fetchSearchResultAction: fetchSearchResultAction(set),
  };
});

export default useSearchStore;
