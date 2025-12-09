import { useFavoritesMutations } from '@/hooks/use-mutations/use-favorites-mutations';
import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { useCallback, useMemo, useState } from 'react';

export function useStoreCardFavorite(storeId: string) {
  const { isLoggedIn, user } = useUserQuery();
  const { createFavorite, deleteFavorite } = useFavoritesMutations();
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = useMemo(() => {
    return user?.favorites.find((favorite) => favorite.store.id === storeId);
  }, [user?.favorites, storeId]);

  const isFavorite = Boolean(favorited);

  const toggleFavorite = useCallback(() => {
    if (!isLoggedIn || !user) return;

    // Animação do coração
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    if (isFavorite && favorited) {
      deleteFavorite({
        id: favorited.id,
        user: { id: user.id },
      });
    } else {
      createFavorite({
        store: { id: storeId },
        user: { id: user.id },
      });
    }
  }, [
    isLoggedIn,
    user,
    isFavorite,
    favorited,
    storeId,
    createFavorite,
    deleteFavorite,
  ]);

  return {
    isLoggedIn,
    isFavorite,
    isAnimating,
    toggleFavorite,
  };
}
