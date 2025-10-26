import { useMemo } from 'react';
import { useStoresAdminStore } from './stores.store';

export const useStoresAdmin = () => {
  const store = useStoresAdminStore();

  const isEditingStore = !!store.store.id;
  const isLoading = store.fetchingStatus === 'loading';

  const totalStores = useMemo(() => store.stores.length, [store.stores]);
  const activeStores = useMemo(
    () => store.stores.filter((s) => s.isActive).length,
    [store.stores],
  );

  return {
    // State
    store: store.store,
    stores: store.stores,
    fetchingStatus: store.fetchingStatus,
    professional: store.professional,
    isAddModalOpen: store.isAddModalOpen,
    isViewDetailsStoreOpen: store.isViewDetailsStoreOpen,
    isAddProfessional: store.isAddProfessional,
    totalStores,
    activeStores,
    isEditingStore,
    isLoading,

    // Actions
    setIsAddModalOpen: store.setIsAddModalOpen,
    resetStore: store.resetStore,
    setViewDetailsStore: store.setViewDetailsStore,
    addStore: store.addStore,
    updateStore: store.updateStore,
    deleteStore: store.deleteStore,
    toggleStoreStatus: store.toggleStoreStatus,
    setIsAddProfessional: store.setIsAddProfessional,
    updateMainImage: store.updateMainImage,
    createImage: store.createImage,
    deleteImage: store.deleteImage,
    createStoreMember: store.createStoreMember,
    updateStoreMember: store.updateStoreMember,
    deleteStoreMember: store.deleteStoreMember,
  };
};
