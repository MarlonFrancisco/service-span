import { useServices } from '@/store';
import { useFormContext } from 'react-hook-form';
import { TCategoryFormData } from '../category.schema';

export const useCategoryForm = () => {
  const { category } = useServices();
  const form = useFormContext<TCategoryFormData>();

  const isEditing = !!category.id;

  return { form, category, isEditing };
};
