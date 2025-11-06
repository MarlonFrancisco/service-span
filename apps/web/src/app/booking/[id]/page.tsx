import { BookingFlow } from '@/components/features/booking';
import { StoreService } from '@/service/store/store.service';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.store(id),
    queryFn: () => StoreService.get(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BookingFlow />
    </HydrationBoundary>
  );
}
