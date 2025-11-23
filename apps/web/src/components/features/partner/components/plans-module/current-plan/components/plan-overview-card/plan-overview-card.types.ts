export type TPlanOverviewCardConfig = {
  planName: string;
  price: number;
  billingPeriod: 'month' | 'year';
  cancelAtPeriodEnd: boolean;
  nextBillingDate?: Date;
  schedulesLength: number;
  maxSchedules: number;
  storesLength: number;
  maxStores: number;
  storeMembersLength: number;
  maxUsers: number;
  onCancelReactivateClick: () => void;
  delay?: number;
};

export type TUsePlanOverviewCardConfig = Pick<
  TPlanOverviewCardConfig,
  | 'nextBillingDate'
  | 'schedulesLength'
  | 'maxSchedules'
  | 'storesLength'
  | 'maxStores'
  | 'storeMembersLength'
  | 'maxUsers'
>;
