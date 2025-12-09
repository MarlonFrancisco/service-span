import { ServiceService } from '@/service/partner/service/service.service';
import { ICategory, IService } from '@/types/api/service.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useServicesMutations = ({ storeId }: { storeId: string }) => {
  const queryClient = useQueryClient();

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
                    s.id === data.id ? { ...s, ...data } : s,
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
    createService,
    isCreatingService,
    updateService,
    isUpdatingService,
    deleteService,
    isDeletingService,
  };
};
