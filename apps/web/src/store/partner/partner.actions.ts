import { TStoreSet } from '@/types/store.types';
import type { IPartnerStore, TStore } from './partner.types';

export const setActiveStoreAction =
  (set: TStoreSet<IPartnerStore>) => (store: TStore) => {
    set({ activeStore: store });
  };

export const setIsMobileSidebarOpenAction =
  (set: TStoreSet<IPartnerStore>) => (isOpen: boolean) => {
    set({ isMobileSidebarOpen: isOpen });
  };
