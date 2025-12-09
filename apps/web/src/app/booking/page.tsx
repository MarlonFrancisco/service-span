import { SearchResults } from '@/components/features/search';
import { SearchService } from '@/service/search';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const queryClient = getQueryClient();
  const params = await searchParams;
  const query = params.query;

  if (query) {
    await queryClient.prefetchQuery({
      queryKey: CACHE_QUERY_KEYS.search(query),
      queryFn: () => SearchService.searchStores(query),
    });
  } else {
    redirect('/');
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchResults />
    </HydrationBoundary>
  );
}
