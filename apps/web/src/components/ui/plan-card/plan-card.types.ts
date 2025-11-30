import { IPlan } from '@/types/api/payment.types';

export type TPlanCardConfig = {
  plan: IPlan;
  index: number;
  trialPeriodDays: number;
  isCurrentPlan?: boolean;
  customButtonText?: string;
  onSelectPlan?: (priceId: string) => void;
  isLoading?: boolean;
};
