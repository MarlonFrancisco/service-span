import { SubscriptionService } from '@/service/subscription';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { useUserQuery } from '../use-user-query';

export const useSubscriptionQuery = () => {
  const { isLoggedIn } = useUserQuery();

  const { data: currentPlan, isLoading: isGettingCurrentPlan } = useQuery({
    queryKey: CACHE_QUERY_KEYS.currentPlan(),
    queryFn: () => SubscriptionService.getCurrentPlan(),
    enabled: isLoggedIn,
  });

  return {
    currentPlan,
    isGettingCurrentPlan,
  };
};
