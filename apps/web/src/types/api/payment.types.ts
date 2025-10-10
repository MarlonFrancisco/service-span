export interface IPlan {
  id: string;
  object: string;
  active: boolean;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  metadata: Record<string, string>;
  meter: string;
  nickname: string;
  product: string;
  tiers_mode: string;
  transform_usage: string;
  trial_period_days: number;
  usage_type: string;
}

export interface IPlansResponse {
  object: string;
  data: IPlan[];
}
