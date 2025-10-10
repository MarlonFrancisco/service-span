export interface IPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  maxAppointments: number;
  maxStores: number;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

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
  currentPlan: IPlan | null;
  usageStats: IUsageStats;
  billingCycle: 'monthly' | 'yearly';

  // Actions
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  selectPlan: (planId: string) => void;
}
