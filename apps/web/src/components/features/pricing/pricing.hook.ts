import { usePlansQuery } from '@/hooks/use-query/use-plans-query';

export const usePricing = () => {
  const { plans, isPendingPlans } = usePlansQuery();

  return { plans, isPendingPlans };
};
