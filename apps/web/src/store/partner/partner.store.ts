import { create } from 'zustand';
import {
  setActiveStoreAction,
  setIsMobileSidebarOpenAction,
} from './partner.actions';
import { MOCK_STORES, MODULE_CONFIG } from './partner.constants';
import type { IPartnerStore } from './partner.types';

export const usePartnerStore = create<IPartnerStore>((set) => ({
  activeStore: MOCK_STORES[0]!,
  stores: MOCK_STORES,
  isMobileSidebarOpen: false,
  activeModule: null,
  moduleConfig: MODULE_CONFIG,

  // Actions
  setActiveStore: setActiveStoreAction(set),
  setIsMobileSidebarOpen: setIsMobileSidebarOpenAction(set),
}));
