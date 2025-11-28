import { UsersService } from '@/service/users';
import { IUser } from '@/types/api';
import { cookies } from '@/utils/helpers/cookie.helper';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUsersMutations = () => {
  const queryClient = getQueryClient();

  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: (avatar: string) => UsersService.updateAvatar(avatar),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.user(cookies.get('user_identification')!),
        (old: IUser) => ({
          ...old,
          ...data,
        }),
      );
      toast.success('Avatar atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar avatar');
    },
  });

  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: () => UsersService.delete(),
    onSuccess: (user: { id: string }) => {
      queryClient.invalidateQueries({
        queryKey: CACHE_QUERY_KEYS.user(user.id),
      });
      toast.success('Conta excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir conta');
    },
  });

  return {
    updateAvatar,
    isUpdatingAvatar,

    deleteUser,
    isDeletingUser,
  };
};
