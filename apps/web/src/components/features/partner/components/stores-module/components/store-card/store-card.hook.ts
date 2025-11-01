import { useStoreMutations } from '@/hooks/use-mutations/use-store-mutations/use-store-mutations.hook';
import { useStoresStore } from '@/store/admin/stores';
import { IStore } from '@/types/api/stores.types';
import { useCallback } from 'react';

export const useStoreCard = (store: IStore) => {
  const { setIsAddModalOpen, setViewDetailsStore } = useStoresStore();

  const { updateStore, deleteStore, isUpdatingStore, isDeletingStore } =
    useStoreMutations();

  const handleEditStore = useCallback(async () => {
    setIsAddModalOpen({ isOpen: true, store });
  }, [setIsAddModalOpen, store]);

  const handleToggleStatus = useCallback(() => {
    updateStore({ id: store.id!, isActive: !store.isActive });
  }, [updateStore, store]);

  const handleDeleteStore = useCallback(async () => {
    deleteStore(store.id!);
  }, [deleteStore, store]);

  const handleViewDetails = useCallback(() => {
    setViewDetailsStore({ isOpen: true, store });
  }, [setViewDetailsStore, store]);

  return {
    isLoading: isUpdatingStore || isDeletingStore,
    handleEditStore,
    handleToggleStatus,
    handleDeleteStore,
    handleViewDetails,
  };
};
