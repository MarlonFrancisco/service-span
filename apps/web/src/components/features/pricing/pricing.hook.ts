import { usePlansQuery } from '@/hooks/use-query/use-plans-query';
import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { useMemo, useState } from 'react';

export const usePricing = () => {
  const { plans, isPendingPlans } = usePlansQuery();
  const { currentPlan } = useSubscriptionQuery();

  const [type, setType] = useState<'month' | 'year'>('month');

  const filteredPlans = useMemo(() => {
    return plans?.[type] || [];
  }, [plans, type]);

  return { plans: filteredPlans, isPendingPlans, type, setType, currentPlan };
};
