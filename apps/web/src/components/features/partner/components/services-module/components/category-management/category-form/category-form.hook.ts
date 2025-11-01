import { useServicesStore } from '@/store';
import { useFormContext } from 'react-hook-form';
import { TCategoryFormData } from '../category.schema';

export const useCategoryForm = () => {
  const category = useServicesStore((state) => state.category);
  const form = useFormContext<TCategoryFormData>();

  const isEditing = !!category.id;

  return { form, category, isEditing };
};
