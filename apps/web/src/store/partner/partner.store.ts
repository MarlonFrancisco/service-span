import { create } from 'zustand';
import {
  setActiveStoreAction,
  setIsMobileSidebarOpenAction,
} from './partner.actions';
import { MODULE_CONFIG } from './partner.constants';
import type { IPartnerStore, TStore } from './partner.types';

export const usePartnerStore = create<IPartnerStore>((set, get) => ({
  activeStore: {} as TStore,
  isMobileSidebarOpen: false,
  activeModule: null,
  moduleConfig: MODULE_CONFIG,
  setActiveStore: setActiveStoreAction(set, get),
  setIsMobileSidebarOpen: setIsMobileSidebarOpenAction(set, get),
}));
