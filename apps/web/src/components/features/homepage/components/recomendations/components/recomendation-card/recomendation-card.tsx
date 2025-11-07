import { IRecommendationStore } from '@/types/api/recomendation.types';
import { Badge, Card, CardContent } from '@repo/ui';
import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="recommendations-card py-0 group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Section with Gradient Overlay */}
          <div className="relative overflow-hidden bg-gray-100 flex-shrink-0 w-full h-52">
            <Image
              src={store.metadata.gallery?.[0]?.url ?? ''}
              alt={store.content.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={false}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              {store.content.services.map((service) => (
                <Badge
                  key={service.id}
                  className="bg-white/95 backdrop-blur text-gray-900 border-0 font-medium text-xs md:text-sm"
                >
                  {service.name}
                </Badge>
              ))}
            </div>

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
          <div className="p-4 md:p-6 flex flex-col flex-grow">
            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-900">
                  {store.metadata.reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0,
                  ) / store.metadata.reviews.length}
                </span>
              </div>
              <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                {store.metadata.reviews.length} avaliações
              </span>
            </div>

            {/* Service Name */}
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {store.content.name}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
              {store.content.description}
            </p>

            {/* Footer: Price and Button */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex-grow">
                <p className="text-xs text-gray-500 mb-1">A partir de</p>
                <p className="text-lg md:text-xl font-bold text-green-600">
                  {store.content.services.reduce(
                    (sum, service) => sum + service.price,
                    0,
                  ) / store.content.services.length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
