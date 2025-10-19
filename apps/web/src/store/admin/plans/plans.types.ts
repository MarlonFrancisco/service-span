import { IPlan } from '@/types/api';

export interface IUsageStats {
  currentAppointments: number;
  maxAppointments: number;
  currentStores: number;
  maxStores: number;
  usagePercentage: number;
}

export interface IPlansStore {
  // State
  plans: IPlan[];
  usageStats: IUsageStats;
  currentPlan?: IPlan;
}
