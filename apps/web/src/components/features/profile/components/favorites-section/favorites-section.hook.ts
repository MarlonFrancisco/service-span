import { useFavoritesMutations } from '@/hooks/use-mutations/use-favorites-mutations';
import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { IFavorite } from '@/types/api/favorites.types';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

export const useFavoritesSection = () => {
  const [selectedFavorite, setSelectedFavorite] = useState<
    IFavorite | undefined
  >(undefined);

  const router = useRouter();
  const { deleteFavorite } = useFavoritesMutations();

  const { user } = useUserQuery();

  console.log(user);

  const favorites = useMemo(() => {
    return user?.favorites ?? [];
  }, [user?.favorites]);

  const handleRemoveFavorite = useCallback(
    (favoriteId: string) => {
      deleteFavorite(favoriteId);
    },
    [deleteFavorite],
  );

  const handleSchedule = useCallback(
    (favorite: IFavorite) => {
      router.push(`/booking?storeId=${favorite.store.id}`);
    },
    [router],
  );

  return {
    favorites,
    selectedFavorite,
    setSelectedFavorite,
    handleRemoveFavorite,
    handleSchedule,
  };
};
