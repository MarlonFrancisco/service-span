import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { useFavoritesMutations } from '@/hooks/use-mutations/use-favorites-mutations';
import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { IRecommendationStore } from '@/types/api/recomendation.types';
import { formatStorePrice } from '@/utils/helpers/price.helper';
import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface RecommendationCardProps {
  store: IRecommendationStore;
}

export const RecommendationCard = ({ store }: RecommendationCardProps) => {
  const router = useRouter();
  const { isLoggedIn, user } = useUserQuery();
  const { createFavorite, deleteFavorite } = useFavoritesMutations();
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  const favorited = useMemo(() => {
    return user?.favorites.find((favorite) => favorite.store.id === store.id);
  }, [user?.favorites, store.id]);

  const isFavorited = Boolean(favorited);

  const handleFavoriteClick = () => {
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 600);

    if (isFavorited) {
      deleteFavorite({
        id: favorited!.id,
        user: { id: user!.id },
      });
    } else {
      createFavorite({
        store: { id: store.id },
        user: { id: user!.id },
      });
    }
  };

  const rating = (
    store.metadata.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    ) / store.metadata.reviews.length || 0
  ).toFixed(1);

  const handleBooking = () => {
    router.push(`/booking/${store.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full select-none"
      onClick={handleBooking}
    >
      <div className="group cursor-pointer h-full flex flex-col max-w-full">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-xl bg-gray-100 flex-shrink-0 w-full aspect-square mb-3">
          <ImageWithFallback
            src={store.metadata.gallery?.[0]?.url ?? ''}
            alt={store.content.name}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 300px, (min-width: 768px) 320px, (min-width: 640px) 240px, 280px"
            className="group-hover:scale-105 transition-transform duration-300 object-cover"
          />

          {/* Favorite Button */}
          {isLoggedIn && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 active:scale-95 shadow-sm"
              aria-label="Adicionar aos favoritos"
            >
              <motion.div
                animate={
                  isHeartAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                <Heart
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-700'
                  }`}
                />
              </motion.div>
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col gap-1">
          {/* Location and Rating */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-gray-900 truncate">
              {store.content.city}
            </p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-3.5 w-3.5 fill-gray-900 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                {rating}
              </span>
            </div>
          </div>

          {/* Service Name */}
          <h3 className="text-sm text-gray-600 line-clamp-1">
            {store.content.name}
          </h3>

          {/* Services Badge */}
          {store.content.services && store.content.services.length > 0 && (
            <p className="text-sm text-gray-600 line-clamp-1">
              {store.content.services.length}{' '}
              {store.content.services.length === 1 ? 'serviço' : 'serviços'}
            </p>
          )}

          {/* Price */}
          <div className="mt-1">
            <p className="text-sm">
              <span className="font-semibold text-gray-900">
                {formatStorePrice(
                  store.content.services.reduce(
                    (sum, service) => sum + service.price,
                    0,
                  ) / store.content.services.length,
                  store.metadata.currency,
                  store.content.country,
                )}
              </span>
              <span className="text-gray-600"> / serviço</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
