import { Homepage } from '@/components/features/homepage';
import { RecomendationService } from '@/service/recomendation';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.recommendationStores(),
    queryFn: () => RecomendationService.getRecommendationStores(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Homepage />
    </HydrationBoundary>
  );
}
