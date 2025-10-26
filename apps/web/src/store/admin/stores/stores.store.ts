import { create } from 'zustand';
import {
  addStoreAction,
  createImageAction,
  createStoreMemberAction,
  deleteImageAction,
  deleteStoreAction,
  deleteStoreMemberAction,
  fetchStoresAction,
  resetStoreAction,
  setIsAddModalOpenAction,
  setIsAddProfessionalAction,
  setViewDetailsStoreAction,
  toggleStoreStatusAction,
  updateMainImageAction,
  updateStoreAction,
  updateStoreMemberAction,
} from './store.actions';
import { INITIAL_PROFESSIONAL, INITIAL_STORE } from './stores.constants';
import type { IStoresStore } from './stores.types';

export const useStoresAdminStore = create<IStoresStore>((set, get) => {
  fetchStoresAction(set, get)();

  return {
    // State
    store: INITIAL_STORE,
    stores: [],
    isAddModalOpen: false,
    isViewDetailsStoreOpen: false,
    isAddProfessional: false,
    professional: INITIAL_PROFESSIONAL,
    fetchingStatus: 'loading',

    // Actions
    setIsAddModalOpen: setIsAddModalOpenAction(set, get),
    resetStore: resetStoreAction(set, get),
    setViewDetailsStore: setViewDetailsStoreAction(set, get),
    setIsAddProfessional: setIsAddProfessionalAction(set, get),

    // Store CRUD
    addStore: addStoreAction(set, get),
    updateStore: updateStoreAction(set, get),
    deleteStore: deleteStoreAction(set, get),
    toggleStoreStatus: toggleStoreStatusAction(set, get),

    // Gallery CRUD
    updateMainImage: updateMainImageAction(set, get),
    createImage: createImageAction(set, get),
    deleteImage: deleteImageAction(set, get),

    // Store Members CRUD
    createStoreMember: createStoreMemberAction(set, get),
    updateStoreMember: updateStoreMemberAction(set, get),
    deleteStoreMember: deleteStoreMemberAction(set, get),
  };
});
