import { useStoresAdmin } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { storeFormSchema, type TStoreFormSchema } from './store-form.schema';

export const useStoreFormTabs = () => {
  const {
    store,
    isEditingStore,
    isLoading,
    setIsAddModalOpen,
    updateStore,
    addStore,
  } = useStoresAdmin();

  const form = useForm<TStoreFormSchema>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: store,
  });

  // Reset form when editingStore changes
  useEffect(() => {
    if (isEditingStore) {
      form.reset(store);
    }
  }, [store, form, isEditingStore]);

  const handleSubmit = useCallback(() => {
    form.handleSubmit(
      (data) => {
        if (isEditingStore) {
          updateStore({
            ...data,
            gallery: undefined,
            storeMembers: undefined,
          });
        } else {
          addStore({
            ...data,
            gallery: undefined,
            storeMembers: undefined,
          });
        }
      },
      (errors) => {
        const firstError = Object.values(errors)[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      },
    )();
  }, [form, isEditingStore, updateStore, addStore]);

  const handleClose = useCallback(() => {
    setIsAddModalOpen({ isOpen: false });
  }, [setIsAddModalOpen]);

  return {
    form,
    isEditingStore,
    isLoading,
    handleSubmit,
    handleClose,
  };
};
