import { FavoritesService } from '@/service/users/favorites.service';
import { IFavorite } from '@/types/api/favorites.types';
import { IUser } from '@/types/api/users.types';
import { cookies } from '@/utils/helpers/cookie.helper';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFavoritesMutations = () => {
  const queryClient = getQueryClient();

  const { mutate: createFavorite, isPending: isCreatingFavorite } = useMutation(
    {
      mutationFn: (favorite: IFavorite) => FavoritesService.create(favorite),
      onSuccess: (data: IFavorite) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.user(cookies.get('user_identification')!),
          (old: IUser) => ({
            ...old,
            favorites: [...old.favorites, data],
          }),
        );
        toast.success('Favorito criado com sucesso');
      },
      onError: () => {
        toast.error('Erro ao criar favorito');
      },
    },
  );

  const { mutate: deleteFavorite, isPending: isDeletingFavorite } = useMutation(
    {
      mutationFn: (id: string) => FavoritesService.delete(id),
      onSuccess: (data: IFavorite) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.user(cookies.get('user_identification')!),
          (old: IUser) => ({
            ...old,
            favorites: old.favorites.filter((f) => f.id !== data.id),
          }),
        );
        toast.success('Favorito excluído com sucesso');
      },
      onError: () => {
        toast.error('Erro ao excluir favorito');
      },
    },
  );

  return {
    createFavorite,
    isCreatingFavorite,
    deleteFavorite,
    isDeletingFavorite,
  };
};
