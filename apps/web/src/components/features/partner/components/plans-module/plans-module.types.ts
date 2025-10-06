export type TPlanId = 'standard' | 'premium' | 'business';

export type TPlan = {
  id: TPlanId;
  name: string;
  price: number;
  period: string;
  maxStores: number;
  features: string[];
  highlight: boolean;
};

export type TCurrentPlan = {
  name: string;
  expiresAt: Date;
  storesCount: number;
  maxStores: number;
};

export type TUsePlansModuleReturn = {
  // State
  selectedPlan: TPlanId | null;
  showCheckout: boolean;
  currentPlan: TCurrentPlan;
  plans: TPlan[];
  selectedPlanData: TPlan | undefined;

  // Actions
  handleSelectPlan: (planId: TPlanId) => void;
  handleCloseCheckout: () => void;
};
