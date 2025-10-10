export type TStore = {
  id: string;
  name: string;
  address: string;
};

export type TModuleId =
  | 'dashboard'
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
  activeStore: TStore;
  stores: TStore[];
  isMobileSidebarOpen: boolean;
  activeModule: TModuleId | null;
  moduleConfig: Record<TModuleId, TModuleConfig>;

  // Actions
  setActiveStore: (store: TStore) => void;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}
