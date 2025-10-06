import type { TPlan } from '../../plans-module.types';

export type TCheckoutModalConfig = {
  isOpen: boolean;
  plan: TPlan | undefined;
  onClose: () => void;
};
