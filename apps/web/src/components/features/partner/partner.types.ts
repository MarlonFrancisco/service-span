// Partner Dashboard Types - ANCR-FA Architecture

export type TPartnerModule =
  | 'dashboard'
  | 'stores'
  | 'services'
  | 'agenda'
  | 'plans'
  | 'notifications';

export type TStore = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  status: 'active' | 'paused';
};

export type TActiveStore = TStore;

export type TPartnerDashboardConfig = React.PropsWithChildren<{}>;

export type TPartnerDashboardState = {
  activeStore: TActiveStore;
  stores: TStore[];
};

export type TPartnerDashboardHookReturn = TPartnerDashboardState & {
  handleModuleChange: (module: TPartnerModule) => void;
  handleStoreChange: (store: TActiveStore) => void;
  getModuleTitle: (module: TPartnerModule) => string;
  shouldShowStoreSelector: (module: TPartnerModule) => boolean;
};
