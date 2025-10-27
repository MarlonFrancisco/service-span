import { IStore } from '@/types/api/stores.types';
import { IProfessional } from '@/types/api/users.types';

export interface IStoresStore {
  // State
  store: IStore;
  stores: IStore[];
  professional: IProfessional;
  isAddModalOpen: boolean;
  isViewDetailsStoreOpen: boolean;
  isAddProfessional: boolean;

  // Actions
  setIsAddModalOpen: (params: { isOpen: boolean; store?: IStore }) => void;
  setViewDetailsStore: (params: { isOpen: boolean; store?: IStore }) => void;
  setIsAddProfessional: (params: {
    isOpen: boolean;
    professional?: IProfessional;
  }) => void;
}
