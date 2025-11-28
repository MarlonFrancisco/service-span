import { SearchService } from '@/service/search';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

interface UseSearchQueryParams {
  query: string;
}

export const useSearchQuery = ({ query }: UseSearchQueryParams) => {
  const { data, isPending, isError } = useQuery({
    queryKey: CACHE_QUERY_KEYS.search(query),
    queryFn: () => SearchService.searchStores(query),
  });

  return { data, isPending, isError };
};
