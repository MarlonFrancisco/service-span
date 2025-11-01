import { BlockedTimesService } from '@/service/partner/blocked-times/blocked-times.service';
import { IBlockedTime } from '@/types/api/blocked-times.types';
import { IStore } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useBlockedTimeMutations = ({ storeId }: { storeId: string }) => {
  const queryClient = getQueryClient();
  const { mutate: createBlockedTime, isPending: isCreatingBlockedTime } =
    useMutation({
      mutationFn: (blockedTime: Partial<IBlockedTime>) =>
        BlockedTimesService.create(storeId, blockedTime),
      onSuccess: (data: IBlockedTime) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.store(storeId),
          (old: IStore) => ({
            ...old,
            storeMembers: old.storeMembers.map((storeMember) =>
              storeMember.id === data.storeMember.id
                ? {
                    ...storeMember,
                    blockedTimes: [...storeMember.blockedTimes, data],
                  }
                : storeMember,
            ),
          }),
        );

        toast.success('Horário bloqueado criado com sucesso');
      },
      onError: () => {
        toast.error('Erro ao criar horário bloqueado');
      },
    });

  const { mutate: deleteBlockedTime, isPending: isDeletingBlockedTime } =
    useMutation({
      mutationFn: (blockedTime: IBlockedTime) =>
        BlockedTimesService.delete(
          storeId,
          blockedTime.storeMember.id,
          blockedTime.id,
        ),
      onSuccess: (data: IBlockedTime) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.store(storeId),
          (old: IStore) => ({
            ...old,
            storeMembers: old.storeMembers.map((storeMember) =>
              storeMember.id === data.storeMember.id
                ? {
                    ...storeMember,
                    blockedTimes: storeMember.blockedTimes.filter(
                      (blockedTime) => blockedTime.id !== data.id,
                    ),
                  }
                : storeMember,
            ),
          }),
        );
        toast.success('Horário bloqueado deletado com sucesso');
      },
      onError: () => {
        toast.error('Erro ao deletar horário bloqueado');
      },
    });

  return {
    createBlockedTime,
    deleteBlockedTime,
    isCreatingBlockedTime,
    isDeletingBlockedTime,
  };
};
