import { PaymentHistory, CurrentPlanData } from '../plans-module.types';

export interface CurrentPlanState {
  currentPlan: CurrentPlanData;
  paymentHistory: PaymentHistory[];
  usagePercentage: number;
  storesUsagePercentage: number;
  usersUsagePercentage: number;
}
