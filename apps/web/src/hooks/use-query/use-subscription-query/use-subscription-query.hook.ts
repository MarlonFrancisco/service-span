import { SubscriptionService } from '@/service/subscription';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useSubscriptionQuery = () => {
  const { data: currentPlan, isLoading: isGettingCurrentPlan } = useQuery({
    queryKey: CACHE_QUERY_KEYS.currentPlan(),
    queryFn: () => SubscriptionService.getCurrentPlan(),
  });

  return {
    currentPlan,
    isGettingCurrentPlan,
  };
};
