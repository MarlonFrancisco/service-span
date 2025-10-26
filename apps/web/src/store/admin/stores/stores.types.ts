import { FetchingStatus } from '@/types/api';
import { IStore, IStoreGallery } from '@/types/api/stores.types';
import { IProfessional, TProfessionalRole } from '@/types/api/users.types';

export interface IStoresStore {
  // State
  store: IStore;
  stores: IStore[];
  professional: IProfessional;
  isAddModalOpen: boolean;
  isViewDetailsStoreOpen: boolean;
  isAddProfessional: boolean;
  fetchingStatus: FetchingStatus;

  // Actions
  setIsAddModalOpen: (params: { isOpen: boolean; store?: IStore }) => void;
  resetStore: () => void;
  setViewDetailsStore: (params: { isOpen: boolean; store?: IStore }) => void;
  setIsAddProfessional: (params: {
    isOpen: boolean;
    professional?: IProfessional;
  }) => void;

  // Store CRUD
  addStore: (store: Partial<IStore>) => Promise<void>;
  updateStore: (store: Partial<IStore>) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
  toggleStoreStatus: ({
    id,
    isActive,
  }: {
    id: string;
    isActive: boolean;
  }) => Promise<void>;

  // Gallery CRUD
  updateMainImage: (params: {
    storeId: string;
    imageId: string;
  }) => Promise<void>;
  createImage: (params: {
    storeId: string;
    image: Omit<IStoreGallery, 'id'>;
  }) => Promise<IStoreGallery>;
  deleteImage: (params: { storeId: string; imageId: string }) => Promise<void>;

  // Store Members CRUD
  createStoreMember: (params: {
    storeId: string;
    professional: { user: { email: string }; role: TProfessionalRole };
  }) => Promise<IProfessional>;
  updateStoreMember: (params: {
    storeId: string;
    professional: {
      id: string;
      role?: TProfessionalRole;
      user?: { email: string };
      isActive?: boolean;
    };
  }) => Promise<IProfessional>;
  deleteStoreMember: (params: {
    storeId: string;
    professionalId: string;
  }) => Promise<void>;
}
