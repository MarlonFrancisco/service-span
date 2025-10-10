export interface IStoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  isActive: boolean;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  images?: string[];
  professionals?: string[];
}

export interface IStoreFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export interface IStoresStore {
  // State
  stores: IStoreLocation[];
  isAddModalOpen: boolean;
  editingStore: IStoreLocation | null;
  formData: IStoreFormData;

  // Computed
  totalStores: number;
  activeStores: number;

  // Actions
  setIsAddModalOpen: (isOpen: boolean) => void;
  setEditingStore: (store: IStoreLocation | null) => void;
  setFormData: (data: Partial<IStoreFormData>) => void;
  resetForm: () => void;

  // Store CRUD
  addStore: (store: Omit<IStoreLocation, 'id'>) => void;
  updateStore: (id: string, store: Partial<IStoreLocation>) => void;
  deleteStore: (id: string) => void;
  toggleStoreStatus: (id: string) => void;
}
