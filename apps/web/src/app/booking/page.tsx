import { SearchResults } from '@/components/features/search';
import { SearchService } from '@/service/search';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';

export default async function SearchPage() {
  const queryClient = getQueryClient();

  const headersList = await headers();

  const query = headersList.get('query');

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.search(query!),
    queryFn: () => SearchService.searchStores(query!),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchResults />
    </HydrationBoundary>
  );
}
