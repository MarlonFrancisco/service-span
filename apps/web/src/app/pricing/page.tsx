import { Pricing } from '@/components/features/pricing';
import { PlansService } from '@/service/plans';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function PricingPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['plans'],
    queryFn: () => PlansService.getPlans(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Pricing />
    </HydrationBoundary>
  );
}
