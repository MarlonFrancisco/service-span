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

export type TModuleConfig = {
  title: string;
  description: string;
  showStoreSelector?: boolean;
};

export interface IPartnerStore {
  activeStore: IStore;
  isMobileSidebarOpen: boolean;
  activeModule: TModuleId | null;
  moduleConfig: Record<TModuleId, TModuleConfig>;

  // Actions
  setActiveStore: (store: IStore) => Promise<void>;
  setIsMobileSidebarOpen: (isOpen: boolean) => Promise<void>;
}
