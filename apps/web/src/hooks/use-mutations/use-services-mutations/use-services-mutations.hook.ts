import { CategoryService } from '@/service/partner/category/category.service';
import { ServiceService } from '@/service/partner/service/service.service';
import { ICategory, IService } from '@/types/api/service.types';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useServicesMutations = ({ storeId }: { storeId: string }) => {
  const queryClient = getQueryClient();

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation(
    {
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
    },
  );

  const { mutate: updateCategory, isPending: isUpdatingCategory } = useMutation(
    {
      mutationFn: (category: Partial<ICategory>) =>
        CategoryService.update(storeId, category),
      onSuccess: (data) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.categories(storeId),
          (old: ICategory[]) => old.map((c) => (c.id === data.id ? data : c)),
        );
        toast.success('Categoria atualizada com sucesso');
      },
      onError: () => {
        toast.error('Erro ao atualizar categoria');
      },
    },
  );

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
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
    },
  );

  const { mutate: createService, isPending: isCreatingService } = useMutation({
    mutationFn: (service: Partial<IService>) =>
      ServiceService.create(storeId, service),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) =>
          old.map((c) =>
            c.id === data.category?.id
              ? { ...c, services: [...c.services, data] }
              : c,
          ),
      );
      toast.success('Serviço criado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao criar serviço');
    },
  });

  const { mutate: updateService, isPending: isUpdatingService } = useMutation({
    mutationFn: (service: IService) => ServiceService.update(storeId, service),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) =>
          old.map((c) =>
            c.id === data.category?.id
              ? {
                  ...c,
                  services: c.services.map((s) =>
                    s.id === data.id ? data : s,
                  ),
                }
              : c,
          ),
      );
      toast.success('Serviço atualizado com sucesso');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao atualizar serviço');
    },
  });

  const { mutate: deleteService, isPending: isDeletingService } = useMutation({
    mutationFn: (service: IService) =>
      ServiceService.delete(storeId, service.category!.id!, service.id),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.categories(storeId),
        (old: ICategory[]) =>
          old.map((c) =>
            c.id === data.category?.id
              ? { ...c, services: c.services.filter((s) => s.id !== data.id) }
              : c,
          ),
      );
      toast.success('Serviço excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir serviço');
    },
  });

  return {
    createCategory,
    isCreatingCategory,
    updateCategory,
    isUpdatingCategory,
    deleteCategory,
    isDeletingCategory,
    createService,
    isCreatingService,
    updateService,
    isUpdatingService,
    deleteService,
    isDeletingService,
  };
};
