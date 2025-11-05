import { SearchService } from '@/service/search';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

interface UseSearchQueryParams {
  query: string;
}

export const useSearchQuery = ({ query }: UseSearchQueryParams) => {
  const {
    data: searchResults,
    isPending: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: CACHE_QUERY_KEYS.search(query),
    queryFn: () => SearchService.searchStores(query),
    enabled: !!query,
  });

  return {
    searchResults: searchResults || [],
    isSearchLoading,
    searchError,
    totalResults: searchResults?.length || 0,
  };
};
