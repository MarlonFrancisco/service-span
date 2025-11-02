import { Plan } from '../plans-module.types';

export interface UpgradePlanState {
  plans: Plan[];
  selectedPlan: string | null;
  showCheckout: boolean;
  billingPeriod: 'monthly' | 'yearly';
  monthlyBookings: number;
  avgBookingValue: number;
  noShowRate: number;
}

export interface Benefit {
  icon: any;
  title: string;
  description: string;
}
