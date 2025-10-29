import { useServices } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { categoryFormSchema, TCategoryFormData } from './category.schema';
export const useCategoryManagement = () => {
  const {
    isCategoryModalOpen,
    category,
    setCategoryModalParams,
    createCategory,
    updateCategory,
    isCreatingCategory,
    isUpdatingCategory,
  } = useServices();

  const form = useForm<TCategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  const handleClose = () => {
    setCategoryModalParams({ isOpen: false, category: undefined });
  };

  const handleSubmit = () => {
    form.handleSubmit(
      (data) => {
        const onSettled = () => {
          form.reset();
        };

        if (category.id) {
          updateCategory(data, { onSettled });
        } else {
          createCategory({ ...data, id: undefined }, { onSettled });
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
    isCreatingCategory,
    isUpdatingCategory,
    handleClose,
    handleSubmit,
  };
};
