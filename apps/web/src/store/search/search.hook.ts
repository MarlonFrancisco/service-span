import useSearchStore from "./search.store";

export const useSearchActions = () => {
    const { fetchSearchResultAction } = useSearchStore();

    return {
        fetchSearchResultAction,
    };
};

export const useSearchAttributes = () => {
    const { searchResults, fetchingStatus, showFilters, showSearchBar, hasActiveFilters } = useSearchStore();

    return {
        searchResults,
        fetchingStatus,
        showFilters,
        showSearchBar,
        hasActiveFilters,
    };
};