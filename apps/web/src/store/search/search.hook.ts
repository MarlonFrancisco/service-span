import useSearchStore from './search.store';

export const useSearch = () => {
  const {
    searchResults,
    fetchingStatus,
    showFilters,
    isMobileSearchOpen,
    searchFilters,
    setIsMobileSearchOpen,
    fetchSearchResultAction,
    setSearchFilters,
  } = useSearchStore();

  const activeFiltersCount = [
    searchFilters.location,
    searchFilters.query,
    searchFilters.date,
  ].filter(Boolean).length;

  return {
    searchResults,
    fetchingStatus,
    showFilters,
    isMobileSearchOpen,
    hasActiveFilters: Boolean(activeFiltersCount),
    activeFiltersCount,
    searchFilters,
    setIsMobileSearchOpen,
    fetchSearchResultAction,
    setSearchFilters,
  };
};
