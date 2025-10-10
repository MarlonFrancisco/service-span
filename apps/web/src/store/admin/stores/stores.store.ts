import { create } from 'zustand';
import { INITIAL_FORM_DATA, MOCK_STORES } from './stores.constants';
import type { IStoreLocation, IStoresStore } from './stores.types';

export const useStoresAdminStore = create<IStoresStore>((set, get) => ({
  // State
  stores: MOCK_STORES,
  isAddModalOpen: false,
  editingStore: null,
  formData: INITIAL_FORM_DATA,

  // Computed
  get totalStores() {
    return get().stores.length;
  },

  get activeStores() {
    return get().stores.filter((s) => s.isActive).length;
  },

  // Actions
  setIsAddModalOpen: (isOpen: boolean) => set({ isAddModalOpen: isOpen }),

  setEditingStore: (store: IStoreLocation | null) =>
    set({ editingStore: store }),

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  resetForm: () => set({ formData: INITIAL_FORM_DATA }),

  // Store CRUD
  addStore: (store: Omit<IStoreLocation, 'id'>) => {
    set((state) => ({
      stores: [...state.stores, { ...store, id: String(Date.now()) }],
    }));
  },

  updateStore: (id: string, store: Partial<IStoreLocation>) => {
    set((state) => ({
      stores: state.stores.map((s) => (s.id === id ? { ...s, ...store } : s)),
    }));
  },

  deleteStore: (id: string) => {
    set((state) => ({
      stores: state.stores.filter((s) => s.id !== id),
    }));
  },

  toggleStoreStatus: (id: string) => {
    set((state) => ({
      stores: state.stores.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s,
      ),
    }));
  },
}));
