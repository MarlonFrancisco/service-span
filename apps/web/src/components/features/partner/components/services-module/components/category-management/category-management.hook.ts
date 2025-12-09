import { useCategoryMutations } from '@/hooks/partner/use-category-mutations/use-category-mutations.hook';
import { usePartnerStore, useServicesStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { categoryFormSchema, TCategoryFormData } from './category.schema';
export const useCategoryManagement = () => {
  const isCategoryModalOpen = useServicesStore(
    (state) => state.isCategoryModalOpen,
  );
  const category = useServicesStore((state) => state.category);
  const setCategoryModalParams = useServicesStore(
    (state) => state.setCategoryModalParams,
  );
  const activeStore = usePartnerStore((state) => state.activeStore);

  const { updateCategoryMutation, createCategoryMutation } =
    useCategoryMutations({
      storeId: activeStore.id,
    });

  const form = useForm<TCategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      tabValue: 'list',
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        ...category,
        tabValue: form.getValues('tabValue'),
      });
    }
  }, [category, form]);

  const handleClose = () => {
    setCategoryModalParams({ isOpen: false, category: undefined });
  };

  const handleSubmit = () => {
    const tabValue = form.getValues('tabValue');

    if (tabValue === 'list') {
      form.setValue('tabValue', 'add');

      return;
    }

    form.handleSubmit(
      (data) => {
        const onSettled = () => {
          form.reset();
        };

        if (category.id) {
          updateCategoryMutation.mutate(data, { onSettled });
        } else {
          createCategoryMutation.mutate(
            { ...data, id: undefined },
            { onSettled },
          );
        }
      },
      (errors) => {
        const firstError = Object.values(errors)[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      },
    )();
  };

  return {
    isCategoryModalOpen,
    category,
    form,
    isCreatingCategory: createCategoryMutation.isPending,
    isUpdatingCategory: updateCategoryMutation.isPending,
    handleClose,
    handleSubmit,
  };
};
