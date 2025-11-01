import { create } from 'zustand';
import { INITIAL_STORE } from '../admin/stores/stores.constants';
import {
  setActiveStoreAction,
  setIsMobileSidebarOpenAction,
} from './partner.actions';
import type { IPartnerStore } from './partner.types';

export const usePartnerStore = create<IPartnerStore>((set, get) => ({
  stores: [],
  activeStore: INITIAL_STORE,
  isMobileSidebarOpen: false,
  setActiveStore: setActiveStoreAction(set, get),
  setIsMobileSidebarOpen: setIsMobileSidebarOpenAction(set, get),
}));
