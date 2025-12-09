import { StoreCard } from '@/components/ui/store-card';
import { useFavoritesMutations } from '@/hooks/use-mutations/use-favorites-mutations';
import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { IRecommendationStore } from '@/types/api/recomendation.types';
import { formatStorePrice } from '@/utils/helpers/price.helper';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface RecommendationCardProps {
  store: IRecommendationStore;
}

export const RecommendationCard = ({ store }: RecommendationCardProps) => {
  const router = useRouter();
  const { isLoggedIn, user } = useUserQuery();
  const { createFavorite, deleteFavorite } = useFavoritesMutations();

  const favorited = useMemo(() => {
    return user?.favorites.find((favorite) => favorite.store.id === store.id);
  }, [user?.favorites, store.id]);

  const isFavorited = Boolean(favorited);

  const rating = Number(
    (
      store.metadata.reviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0,
      ) / store.metadata.reviews.length || 0
    ).toFixed(1),
  );

  const price = formatStorePrice(
    store.content.services.reduce((sum, service) => sum + service.price, 0) /
      store.content.services.length,
    store.metadata.currency,
    store.content.country,
  );

  const handleClick = () => {
    router.push(`/booking/${store.id}`);
  };

  const handleFavoriteClick = (newIsFavorite: boolean) => {
    if (!isLoggedIn || !user) return;

    if (!newIsFavorite && favorited) {
      deleteFavorite({
        id: favorited.id,
        user: { id: user.id },
      });
    } else if (newIsFavorite) {
      createFavorite({
        store: { id: store.id },
        user: { id: user.id },
      });
    }
  };

  return (
    <StoreCard
      store={{
        id: store.id,
        name: store.content.name,
        location: store.content.city,
        rating,
        reviewCount: store.metadata.reviews.length,
        price,
        gallery: store.metadata.gallery?.map((g) => g.url) ?? [],
        services: store.content.services.map((s) => ({
          id: s.id,
          name: s.name,
        })),
        isFavorite: isFavorited,
      }}
      onClick={handleClick}
      onFavoriteClick={handleFavoriteClick}
      showFavoriteButton={isLoggedIn}
      showAvailabilityBadge={false}
      showServiceBadge
    />
  );
};
