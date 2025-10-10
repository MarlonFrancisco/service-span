import { usePlansStore } from './plans.store';

export const usePlans = () => {
  const {
    plans,
    currentPlan,
    usageStats,
    billingCycle,
    setBillingCycle,
    selectPlan,
  } = usePlansStore();

  return {
    plans,
    currentPlan,
    usageStats,
    billingCycle,
    setBillingCycle,
    selectPlan,
  };
};
