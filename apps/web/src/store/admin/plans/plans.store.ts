import { create } from 'zustand';
import { getPlansAction } from './plans.actions';
import { INITIAL_USAGE_STATS } from './plans.constants';
import type { IPlansStore } from './plans.types';

export const usePlansStore = create<IPlansStore>((set, get) => {
  getPlansAction(set, get)();

  return {
    // State
    plans: [],
    currentPlan: undefined,
    usageStats: INITIAL_USAGE_STATS,
  };
});
