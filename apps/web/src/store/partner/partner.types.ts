import { IStore } from '@/types/api/stores.types';

export type TModuleId =
  | 'dashboard'
  | 'sales'
  | 'operational'
  | 'customers'
  | 'stores'
  | 'services'
  | 'agenda'
  | 'plans'
  | 'notifications';

export interface IPartnerStore {
  activeStore: IStore;
  isMobileSidebarOpen: boolean;

  // Actions
  setActiveStore: (store: IStore) => Promise<void>;
  setIsMobileSidebarOpen: (isOpen: boolean) => Promise<void>;
}
