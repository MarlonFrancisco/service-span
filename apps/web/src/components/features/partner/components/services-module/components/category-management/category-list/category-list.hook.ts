import { useServices } from '@/store';
import { ICategory } from '@/types/api/service.types';

export const useCategoryList = () => {
  const { categories, setCategoryModalParams, deleteCategory } = useServices();

  const handleEdit = (category: ICategory) => {
    setCategoryModalParams({ isOpen: true, category: category });
  };

  const handleDelete = (category: ICategory) => {
    deleteCategory(category.id);
  };

  return { categories, handleEdit, handleDelete };
};
