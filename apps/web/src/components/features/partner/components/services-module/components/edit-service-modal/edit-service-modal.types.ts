import type { TService } from '../../services-module.types';

export type TEditServiceModalConfig = {
  service: TService | null;
  categories: string[];
  onClose: () => void;
};

