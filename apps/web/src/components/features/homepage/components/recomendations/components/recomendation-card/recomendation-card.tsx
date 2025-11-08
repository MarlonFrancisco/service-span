import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { IRecommendationStore } from '@/types/api/recomendation.types';
import { formatPrice } from '@/utils/helpers/price.helper';
import { Badge, Card, CardContent } from '@repo/ui';
import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RecommendationCardProps {
  store: IRecommendationStore;
  isFavorited: boolean;
}

export const RecommendationCard = ({
  store,
  isFavorited,
}: RecommendationCardProps) => {
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  const handleFavoriteClick = () => {
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 600);
  };

  const rating = (
    store.metadata.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    ) / store.metadata.reviews.length || 0
  ).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="recommendations-card py-0 group cursor-pointer transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Section with Gradient Overlay */}
          <div className="relative overflow-hidden bg-gray-100 flex-shrink-0 w-full h-52">
            <ImageWithFallback
              src={store.metadata.gallery?.[0]?.url ?? ''}
              alt={store.content.name}
              fill
              sizes="(min-width: 768px) 300px, 200px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Favorite Button with Animation */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 bg-white/95 backdrop-blur rounded-full hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Adicionar aos favoritos"
            >
              <motion.div
                animate={
                  isHeartAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isFavorited
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
              </motion.div>
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-2">
              {/* Service Name */}
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {store.content.name}
              </h3>

              {/* Location */}
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                {store.content.city}
              </p>

              {/* Services Section */}
              {store.content.services && store.content.services.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-3">
                  {store.content.services.slice(0, 2).map((service) => (
                    <Badge
                      key={service.id}
                      className="bg-blue-100 text-blue-800 border-0 text-xs"
                    >
                      {service.name}
                    </Badge>
                  ))}
                  {store.content.services.length > 3 && (
                    <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                      +{store.content.services.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Footer: Rating and Price */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex-grow">
                <p className="text-xs text-gray-500 mb-1">A partir de</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  {formatPrice(
                    store.content.services.reduce(
                      (sum, service) => sum + service.price,
                      0,
                    ) / store.content.services.length,
                    'BRL',
                    'pt-BR',
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
                <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs md:text-sm font-semibold text-gray-900">
                  {rating}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
