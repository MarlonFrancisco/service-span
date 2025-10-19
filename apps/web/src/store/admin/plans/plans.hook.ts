import { usePlansStore } from './plans.store';

export const usePlans = () => {
  const { plans, currentPlan, usageStats, selectPlan } = usePlansStore();

  return {
    plans,
    currentPlan,
    usageStats,
    selectPlan,
  };
};
