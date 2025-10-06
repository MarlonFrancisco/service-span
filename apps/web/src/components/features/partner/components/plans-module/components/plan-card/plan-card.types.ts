import type { TPlan, TPlanId } from '../../plans-module.types';

export type TPlanCardConfig = {
  plan: TPlan;
  onSelect: (planId: TPlanId) => void;
};
