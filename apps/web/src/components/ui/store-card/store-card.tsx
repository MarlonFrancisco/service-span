'use client';

import { ImageCarousel } from '@/components/ui/image-carousel';
import { Badge } from '@repo/ui';
import { Heart, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { StoreCardProps } from './store-card.types';

export function StoreCard({
  store,
  isSelected = false,
  onClick,
  onFavoriteClick,
  showFavoriteButton = true,
  showAvailabilityBadge = true,
  showServiceBadge = true,
}: StoreCardProps) {
  const [isFavorite, setIsFavorite] = useState(store.isFavorite || false);

  const { name, rating, reviewCount, location, price, gallery, services } =
    store;

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onFavoriteClick?.(newValue);
  };

  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${name} - ${rating} estrelas, ${reviewCount} avaliações`}
      aria-pressed={isSelected}
      className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-xl"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Imagem com Carousel */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
        <ImageCarousel
          images={gallery}
          alt={name}
          showCounter={false}
          showFullscreenButton={false}
          rounded={false}
          className="h-full w-full"
          aspectRatio={1}
        />

        {/* Botão Favoritar - Estilo Airbnb */}
        {showFavoriteButton && (
          <button
            onClick={handleFavorite}
            aria-label={
              isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
            className="absolute top-3 right-3 z-20 p-2 rounded-full transition-transform hover:scale-110 active:scale-95"
          >
            <Heart
              className={`h-6 w-6 drop-shadow-md transition-colors ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'fill-black/40 text-white stroke-[1.5]'
              }`}
            />
          </button>
        )}

        {/* Badge de Disponibilidade */}
        {showAvailabilityBadge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-white/95 text-gray-900 border-0 text-xs font-medium shadow-sm backdrop-blur-sm">
              Disponível hoje
            </Badge>
          </div>
        )}

        {/* Badge de Serviço Principal (se houver) */}
        {showServiceBadge && services?.[0] && (
          <div className="absolute bottom-3 left-3 z-10">
            <Badge className="bg-black/70 text-white border-0 text-xs backdrop-blur-sm">
              {services[0].name}
            </Badge>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="space-y-1">
        {/* Header: Nome e Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1 leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-3.5 w-3.5 fill-gray-900 text-gray-900" />
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>

        {/* Localização */}
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        {/* Tags de Serviços (compacto) */}
        {services && services.length > 1 && (
          <p className="text-sm text-gray-500 line-clamp-1">
            {services
              .slice(0, 3)
              .map((s) => s.name)
              .join(' · ')}
            {services.length > 3 && ` +${services.length - 3}`}
          </p>
        )}

        {/* Preço */}
        <div className="pt-1">
          <span className="text-[15px] font-semibold text-gray-900">
            {price}
          </span>
          <span className="text-sm text-gray-500 ml-1">por serviço</span>
        </div>
      </div>
    </motion.article>
  );
}
