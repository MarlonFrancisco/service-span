import { useStoresAdminStore } from './stores.store';

export const useStoresAdmin = () => {
  const store = useStoresAdminStore();

  return {
    stores: store.stores,
    isAddModalOpen: store.isAddModalOpen,
    editingStore: store.editingStore,
    formData: store.formData,
    totalStores: store.totalStores,
    activeStores: store.activeStores,
    setIsAddModalOpen: store.setIsAddModalOpen,
    setEditingStore: store.setEditingStore,
    setFormData: store.setFormData,
    resetForm: store.resetForm,
    addStore: store.addStore,
    updateStore: store.updateStore,
    deleteStore: store.deleteStore,
    toggleStoreStatus: store.toggleStoreStatus,
  };
};
