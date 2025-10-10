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

export type TPartnerContext = {
  activeStore: TStore;
  setActiveStore: (store: TStore) => void;
  stores: TStore[];
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  activeModule: TModuleId | null;
  moduleConfig: Record<TModuleId, TModuleConfig>;
};
