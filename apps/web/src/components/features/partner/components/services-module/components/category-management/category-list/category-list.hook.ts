import { useServicesMutations } from '@/hooks';
import { usePartnerStore, useServicesStore } from '@/store';
import { ICategory } from '@/types/api/service.types';
import { useFormContext } from 'react-hook-form';
import { TCategoryFormData } from '../category.schema';

export const useCategoryList = () => {
  const categories = useServicesStore((state) => state.categories);
  const setCategoryModalParams = useServicesStore(
    (state) => state.setCategoryModalParams,
  );
  const activeStore = usePartnerStore((state) => state.activeStore);
  const { deleteCategory } = useServicesMutations({
    storeId: activeStore.id,
  });

  const form = useFormContext<TCategoryFormData>();

  const handleEdit = (category: ICategory) => {
    form.setValue('tabValue', 'edit');
    setCategoryModalParams({ isOpen: true, category: category });
  };

  const handleDelete = (category: ICategory) => {
    deleteCategory(category.id);
  };

  return { categories, handleEdit, handleDelete };
};
