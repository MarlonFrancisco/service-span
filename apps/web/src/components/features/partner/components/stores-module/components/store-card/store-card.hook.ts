import { useStoresAdmin } from '@/store/admin/stores';
import { IStore } from '@/types/api/stores.types';
import { useCallback, useState } from 'react';

export const useStoreCard = (store: IStore) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    setIsAddModalOpen,
    toggleStoreStatus,
    deleteStore,
    setViewDetailsStore,
  } = useStoresAdmin();

  const implementsLoaderOnFunction = async (func: () => any) => {
    setIsLoading(true);
    await func();
    setIsLoading(false);
  };

  const handleEditStore = useCallback(async () => {
    await setIsAddModalOpen({ isOpen: true, store });
  }, [setIsAddModalOpen, store]);

  const handleToggleStatus = useCallback(() => {
    toggleStoreStatus({ id: store.id!, isActive: !store.isActive });
  }, [toggleStoreStatus, store]);

  const handleDeleteStore = useCallback(async () => {
    await implementsLoaderOnFunction(() => deleteStore(store.id!));
  }, [deleteStore, store]);

  const handleViewDetails = useCallback(() => {
    setViewDetailsStore({ isOpen: true, store });
  }, [setViewDetailsStore, store]);

  return {
    isLoading,
    handleEditStore,
    handleToggleStatus,
    handleDeleteStore,
    handleViewDetails,
  };
};
