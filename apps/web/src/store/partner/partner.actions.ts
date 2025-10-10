import type { TStore } from './partner.types';

export const setActiveStoreAction = (set: any) => (store: TStore) => {
  set({ activeStore: store });
};

export const setIsMobileSidebarOpenAction = (set: any) => (isOpen: boolean) => {
  set({ isMobileSidebarOpen: isOpen });
};
