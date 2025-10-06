import type { TService } from '../../services-module.types';

export type TCategoryManagementModalConfig = {
  isOpen: boolean;
  categories: string[];
  services: TService[];
  onClose: () => void;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
};

