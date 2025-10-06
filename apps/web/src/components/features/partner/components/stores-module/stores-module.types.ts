import type { TStore } from '../../partner.types';

export type TStoreImage = {
  id: string;
  url: string;
  file?: File;
  isMain?: boolean;
};

export type TStoreWithImages = TStore & {
  description: string;
  images?: TStoreImage[];
  workingHours: string;
  staff: number;
  monthlyBookings: number;
};

export type TStoreFormData = {
  name: string;
  description: string;
  address: string;
  workingHours: string;
};

export type TUseStoresModuleReturn = {
  // State
  stores: TStoreWithImages[];
  isAddModalOpen: boolean;
  editingStore: TStoreWithImages | null;
  newStoreImages: TStoreImage[];
  editingStoreImages: TStoreImage[];

  // Actions
  toggleStoreStatus: (storeId: string) => void;
  handleEditStore: (store: TStoreWithImages) => void;
  handleCloseEditModal: () => void;
  handleCloseAddModal: () => void;
  setNewStoreImages: (images: TStoreImage[]) => void;
  setEditingStoreImages: (images: TStoreImage[]) => void;
};
