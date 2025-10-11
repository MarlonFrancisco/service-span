export interface IPlan {
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  popular: boolean;
  features: string[];
}

export type IPlansResponse = IPlan[];
