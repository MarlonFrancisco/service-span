import { StoreService } from '@/service/store';
import { IStore } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useStoreMutations = () => {
  const queryClient = useQueryClient();

  const updateStoreMutation = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) => (s.id === data.id ? { ...s, ...data } : s)),
      );
      toast.success('Loja atualizada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar loja');
    },
  });

  const deleteStoreMutation = useMutation({
    mutationFn: (id: string) => StoreService.delete(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.filter((s) => s.id !== data.id),
      );
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.store(data.id),
        () => undefined,
      );
      toast.success('Loja excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir loja');
    },
  });

  const createStoreMutation = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) => [
        ...old,
        data,
      ]);
      toast.success('Loja adicionada com sucesso');
    },
    onError: (error) => {
      console.error(error.message);
      toast.error('Erro ao adicionar loja');
    },
  });

  return {
    updateStoreMutation,
    deleteStoreMutation,
    createStoreMutation,
  };
};
