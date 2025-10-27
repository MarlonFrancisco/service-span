import { create } from 'zustand';
import {
  setIsAddModalOpenAction,
  setIsAddProfessionalAction,
  setViewDetailsStoreAction,
} from './store.actions';
import { INITIAL_PROFESSIONAL, INITIAL_STORE } from './stores.constants';
import type { IStoresStore } from './stores.types';

export const useStoresAdminStore = create<IStoresStore>((set, get) => {
  return {
    // State
    store: INITIAL_STORE,
    stores: [],
    isAddModalOpen: false,
    isViewDetailsStoreOpen: false,
    isAddProfessional: false,
    professional: INITIAL_PROFESSIONAL,

    // Actions
    setIsAddModalOpen: setIsAddModalOpenAction(set, get),
    setViewDetailsStore: setViewDetailsStoreAction(set, get),
    setIsAddProfessional: setIsAddProfessionalAction(set, get),
  };
});
