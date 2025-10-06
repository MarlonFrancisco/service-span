import type { TService } from '../../services-module.types';

export type TServiceCardConfig = {
  service: TService;
  onEdit: (service: TService) => void;
  onDelete: (serviceId: string) => void;
  onToggleStatus: (serviceId: string) => void;
};
