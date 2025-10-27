import { IStore } from '@/types/api/stores.types';
import { IProfessional } from '@/types/api/users.types';
import { TStoreAction } from '@/types/store.types';
import { INITIAL_PROFESSIONAL, INITIAL_STORE } from './stores.constants';
import { IStoresStore } from './stores.types';

/**
 * Stores general Modal Actions
 */

export const setIsAddModalOpenAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; store?: IStore }
> =
  (set) =>
  async ({ isOpen, store }) => {
    set({ isAddModalOpen: isOpen, store: store || INITIAL_STORE });
  };

export const setViewDetailsStoreAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; store?: IStore }
> =
  (set) =>
  async ({ isOpen, store }) => {
    set({ isViewDetailsStoreOpen: isOpen, store: store || INITIAL_STORE });
  };

export const setIsAddProfessionalAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; professional?: IProfessional }
> =
  (set) =>
  async ({ isOpen, professional }) => {
    set({
      isAddProfessional: isOpen,
      professional: professional || INITIAL_PROFESSIONAL,
    });
  };
