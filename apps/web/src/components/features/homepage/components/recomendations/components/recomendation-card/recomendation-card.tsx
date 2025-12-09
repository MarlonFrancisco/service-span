import { StoreCard } from '@/components/ui/store-card';
import { IRecommendationStore } from '@/types/api/recomendation.types';
import { formatStorePrice } from '@/utils/helpers/price.helper';
import { useRouter } from 'next/navigation';

interface RecommendationCardProps {
  store: IRecommendationStore;
}

export const RecommendationCard = ({ store }: RecommendationCardProps) => {
  const router = useRouter();

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
      }}
      onClick={handleClick}
      showAvailabilityBadge={false}
      showServiceBadge
    />
  );
};
