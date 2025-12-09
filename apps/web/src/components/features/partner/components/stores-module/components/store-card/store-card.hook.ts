import { useStoreMutations } from '@/hooks/partner/store/use-store-mutations/use-store-mutations.hook';
import { useStoresStore } from '@/store/admin/stores';
import { IStore } from '@/types/api/stores.types';
import { useCallback } from 'react';

export const useStoreCard = (store: IStore) => {
  const { setIsAddModalOpen, setViewDetailsStore } = useStoresStore();

  const { updateStoreMutation, deleteStoreMutation } = useStoreMutations();

  const handleEditStore = useCallback(async () => {
    setIsAddModalOpen({ isOpen: true, store });
  }, [setIsAddModalOpen, store]);

  const handleToggleStatus = useCallback(() => {
    updateStoreMutation.mutate({ id: store.id!, isActive: !store.isActive });
  }, [updateStoreMutation, store]);

  const handleDeleteStore = useCallback(async () => {
    deleteStoreMutation.mutate(store.id!);
  }, [deleteStoreMutation, store]);

  const handleViewDetails = useCallback(() => {
    setViewDetailsStore({ isOpen: true, store });
  }, [setViewDetailsStore, store]);

  return {
    isLoading: updateStoreMutation.isPending || deleteStoreMutation.isPending,
    handleEditStore,
    handleToggleStatus,
    handleDeleteStore,
    handleViewDetails,
  };
};
