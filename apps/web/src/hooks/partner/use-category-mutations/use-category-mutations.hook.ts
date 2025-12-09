import { CategoryService } from '@/service/partner/category/category.service';
import { ICategory } from '@/types/api/service.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TUseCategoryConfig } from './use-category-mutations.types';

export const useCategoryMutations = ({ storeId }: TUseCategoryConfig) => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (category: Partial<ICategory>) =>
      CategoryService.create(storeId, category),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) => [...old, { ...data, services: [] }],
      );
      toast.success('Categoria criada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao criar categoria');
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (category: Partial<ICategory>) =>
      CategoryService.update(storeId, category),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) =>
          old.map((c) => (c.id === data.id ? { ...c, ...data } : c)),
      );
      toast.success('Categoria atualizada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar categoria');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) =>
      CategoryService.delete(storeId, categoryId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) => old.filter((c) => c.id !== data.id),
      );
      toast.success('Categoria excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir categoria');
    },
  });

  return {
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};
