import { usePlansStore } from '@/store/admin/plans/plans.store';

export const usePricing = () => {
  const { plans } = usePlansStore();

  return { plans };
};
