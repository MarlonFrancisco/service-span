'use client';
import { PlansService } from '@/service/plans';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const usePlansQuery = () => {
  const { data: plans, isPending: isPendingPlans } = useQuery({
    queryKey: CACHE_QUERY_KEYS.plans(),
    queryFn: () => PlansService.getPlans(),
  });

  return { plans, isPendingPlans };
};
