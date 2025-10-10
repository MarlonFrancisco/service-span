import { create } from 'zustand';
import { INITIAL_USAGE_STATS, MOCK_PLANS } from './plans.constants';
import type { IPlansStore } from './plans.types';

export const usePlansStore = create<IPlansStore>((set, get) => ({
  // State
  plans: MOCK_PLANS,
  currentPlan: MOCK_PLANS.find((p) => p.isCurrent) || null,
  usageStats: INITIAL_USAGE_STATS,
  billingCycle: 'monthly',

  // Actions
  setBillingCycle: (cycle: 'monthly' | 'yearly') =>
    set({ billingCycle: cycle }),

  selectPlan: (planId: string) => {
    const plan = get().plans.find((p) => p.id === planId);
    if (plan) {
      set({ currentPlan: plan });
    }
  },
}));
