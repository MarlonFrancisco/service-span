'use client';

import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { Badge, Button, useIsMobile } from '@repo/ui';
import { Clock, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../image-carousel';

interface StoreCardProps {
  store: IStoreSearchListItem;
  isSelected: boolean;
  onClick: () => void;
}

export function StoreCard({ store, isSelected, onClick }: StoreCardProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);
  const setMobileDrawerOpen = useSearchStore(
    (state) => state.setMobileDrawerOpen,
  );

  const { name, rating, reviewCount, location, price, images, services } =
    store;

  const allImages = images;

  const handleSchedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStore(store);
    router.push(`/booking/${store.id}`);
  };

  const handleClick = () => {
    onClick();
    if (isMobile) {
      setMobileDrawerOpen(true);
    }
  };

  // Mobile simplified version
  if (isMobile) {
    return (
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes de ${name}`}
        className="group overflow-hidden cursor-pointer border bg-white p-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          borderColor: 'rgb(229 231 235)',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        }}
      >
        <div className="flex gap-3 p-3 h-full">
          {/* Image */}
          <div className="relative w-32 aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={allImages[0] || '/placeholder.png'}
              alt={name}
              fill
              sizes="128px"
              className="object-cover"
            />
            {allImages.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full z-10">
                1/{allImages.length}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            {/* Top section */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-tight">
                {name}
              </h3>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm text-gray-900">
                    {rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500">({reviewCount})</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>

            {/* Bottom section - Price and Status */}
            <div className="flex items-center justify-between gap-2 mt-auto pt-1.5">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {price}
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 border-0 text-[10px] px-1.5 py-0.5 font-medium leading-none"
              >
                <Clock className="h-3 w-3 mr-0.5" />
                Disponível
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop detailed version
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${name} - ${rating} estrelas, ${reviewCount} avaliações, ${location}`}
      aria-pressed={isSelected}
      className="group relative overflow-hidden cursor-pointer border p-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isSelected ? 'rgb(249 250 251)' : 'rgb(255 255 255)',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        borderColor: isSelected ? 'rgb(0 0 0 / 0.4)' : 'rgb(229 231 235)',
        boxShadow: isSelected
          ? '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)'
          : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      <div className="2xl:flex">
        {/* Image */}
        <div className="2xl:w-96 flex-shrink-0">
          <div className="h-48 2xl:h-80 relative overflow-hidden">
            <ImageCarousel
              images={allImages}
              alt={name}
              showCounter={allImages.length > 1}
              showFullscreenButton={false}
              rounded={false}
              className="h-full"
              aspectRatio={16 / 13.5}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 2xl:p-6 flex flex-col">
          {/* Header: Name and Desktop Price */}
          <div className="flex justify-between items-start mb-3 gap-3">
            <div className="flex-1">
              <h3 className="text-lg 2xl:text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors line-clamp-2 leading-tight">
                {name}
              </h3>
            </div>
            {/* Desktop Price - Hidden on mobile */}
            <div className="hidden 2xl:block text-right flex-shrink-0">
              <div className="text-lg font-bold text-gray-900">{price}</div>
              <div className="text-xs text-gray-500">por serviço</div>
            </div>
          </div>

          {/* Rating and Location */}
          <div className="flex items-center gap-1.5 mb-2 2xl:mb-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 2xl:h-4 2xl:w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm 2xl:text-sm">
                {rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-3 2xl:mb-4 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>{location}</span>
          </div>

          {/* Mobile Price - Hidden on desktop */}
          <div className="2xl:hidden mb-3 pb-3 border-b border-gray-100">
            <div className="text-lg font-bold text-gray-900">{price}</div>
            <div className="text-xs text-gray-500">por serviço</div>
          </div>

          {/* Services Section */}
          {services && services.length > 0 && (
            <div className="pt-3 2xl:pt-4 pb-3 2xl:pb-4 border-t border-gray-100">
              <div className="text-xs 2xl:text-sm font-semibold text-gray-900 mb-2">
                Serviços
              </div>
              <div className="flex gap-2 flex-wrap">
                {services.slice(0, 3).map((service) => (
                  <Badge
                    key={service.id}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-xs"
                  >
                    {service.name}
                  </Badge>
                ))}
                {services.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 border-0 text-xs font-medium"
                  >
                    +{services.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Footer - Push to bottom */}
          <div className="mt-auto flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center gap-3 pt-4 border-t border-gray-100">
            <Button
              className="ml-auto cursor-pointer w-full 2xl:w-auto font-medium"
              variant="outline"
              onClick={handleSchedule}
            >
              Ver agenda e agendar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
