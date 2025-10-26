import { Partner, StoresModule } from '@/components/features/partner';
import { StoreService } from '@/service/store';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function PartnerStoresPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.getStores(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Partner>
        <StoresModule />
      </Partner>
    </HydrationBoundary>
  );
}
