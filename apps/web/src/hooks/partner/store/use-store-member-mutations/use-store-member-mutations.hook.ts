import { StoreMembersService } from '@/service/store/store-members.service';
import { IProfessional } from '@/types/api';
import { IStore } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useStoreMemberMutations = () => {
  const queryClient = useQueryClient();

  const updateStoreMemberMutation = useMutation({
    mutationFn: (data: {
      storeId: string;
      professional: Partial<IProfessional>;
    }) => StoreMembersService.update(data.storeId, data.professional),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? {
                ...s,
                storeMembers: s.storeMembers.map((m) =>
                  m.id === data.id ? { ...m, ...data } : m,
                ),
              }
            : s,
        ),
      );

      queryClient.setQueryData(
        CACHE_QUERY_KEYS.store(data.store!.id),
        (old: IStore) => ({
          ...old,
          storeMembers: old.storeMembers.map((m) =>
            m.id === data.id ? { ...m, ...data } : m,
          ),
        }),
      );
      toast.success('Membro da loja atualizado com sucesso');
    },
  });

  const deleteStoreMemberMutation = useMutation({
    mutationFn: (data: { storeId: string; professionalId: string }) =>
      StoreMembersService.delete(data.storeId, data.professionalId),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? {
                ...s,
                storeMembers: s.storeMembers.filter((m) => m.id !== data.id),
              }
            : s,
        ),
      );
      toast.success('Membro da loja excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir membro da loja');
    },
  });

  const createStoreMemberMutation = useMutation({
    mutationFn: (data: {
      storeId: string;
      professional: Partial<IProfessional>;
    }) => StoreMembersService.create(data.storeId, data.professional),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? { ...s, storeMembers: [...s.storeMembers, data] }
            : s,
        ),
      );
      toast.success('Membro da loja adicionado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao adicionar membro da loja');
    },
  });

  return {
    updateStoreMemberMutation,
    deleteStoreMemberMutation,
    createStoreMemberMutation,
  };
};
