import { useStoreMutations } from '@/hooks/partner/store/use-store-mutations/use-store-mutations.hook';
import { useStoresStore } from '@/store/admin/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { storeFormSchema, type TStoreFormSchema } from './store-form.schema';

export const useStoreFormTabs = () => {
  const { store, setIsAddModalOpen } = useStoresStore();
  const { updateStore, addStore, isUpdatingStore, isAddingStore } =
    useStoreMutations();

  const isEditingStore = !!store.id;

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
        const fn = isEditingStore ? updateStore : addStore;
        const normalizeData = Object.fromEntries(
          Object.entries(data).filter(
            ([key, value]) =>
              value !== '' && !['gallery', 'storeMembers'].includes(key),
          ),
        );

        fn(normalizeData, {
          onSuccess: () => {
            setIsAddModalOpen({ isOpen: false });
          },
        });
      },
      (errors) => {
        const firstError = Object.values(errors)[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      },
    )();
  }, [form, isEditingStore, updateStore, addStore, setIsAddModalOpen]);

  const handleClose = useCallback(() => {
    setIsAddModalOpen({ isOpen: false });
  }, [setIsAddModalOpen]);

  return {
    form,
    isEditingStore,
    isLoading: isUpdatingStore || isAddingStore,
    handleSubmit,
    handleClose,
  };
};
