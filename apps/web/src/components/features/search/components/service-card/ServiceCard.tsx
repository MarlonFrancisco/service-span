'use client';

import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { Badge, Button, Card } from '@repo/ui';
import { MapPin, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../image-carousel';

interface ServiceCardProps {
  store: IStoreSearchListItem;
  isSelected: boolean;
  onClick: () => void;
}

export function ServiceCard({ store, isSelected, onClick }: ServiceCardProps) {
  const router = useRouter();
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  const { name, rating, reviewCount, location, price, images, services } =
    store;

  const allImages = images;

  const handleSchedule = () => {
    setSelectedStore(store);
    router.push(`/booking/${store.id}`);
  };

  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-xl bg-white p-0 rounded-xl ${
        isSelected ? 'ring-2 ring-black shadow-2xl scale-[1.02]' : ''
      }`}
      onClick={onClick}
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
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 2xl:p-6 flex flex-col">
          {/* Header: Name and Desktop Price */}
          <div className="flex justify-between items-start mb-3 2xl:mb-0 gap-2">
            <div className="flex-1">
              <h3 className="text-xl 2xl:text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors line-clamp-2">
                {name}
              </h3>
            </div>
            {/* Desktop Price - Hidden on mobile */}
            <div className="hidden 2xl:block text-right flex-shrink-0">
              <div className="text-xl font-bold text-gray-900">{price}</div>
              <div className="text-sm text-gray-500">por serviço</div>
            </div>
          </div>

          {/* Rating and Location */}
          <div className="flex items-center gap-1 mb-2 2xl:mb-3">
            <Star className="h-3 w-3 2xl:h-4 2xl:w-4 fill-black text-black" />
            <span className="font-medium text-sm 2xl:text-base">{rating}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-600 text-sm 2xl:text-base">
              {reviewCount} avaliações
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-3 2xl:mb-4 text-sm 2xl:text-base">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Mobile Price - Hidden on desktop */}
          <div className="2xl:hidden mb-3 pb-3 border-b border-gray-100">
            <div className="text-xl font-bold text-gray-900">{price}</div>
            <div className="text-xs text-gray-500">por serviço</div>
          </div>

          {/* Services Section */}
          {services && services.length > 0 && (
            <div className="pt-3 2xl:pt-4 pb-3 2xl:pb-4 border-t border-gray-100">
              <div className="text-xs 2xl:text-sm font-semibold text-gray-900 mb-2">
                Serviços Disponíveis
              </div>
              <div className="flex gap-1 2xl:gap-2 flex-wrap">
                {services.slice(0, 3).map((service) => (
                  <Badge
                    key={service.id}
                    className="bg-blue-100 text-blue-800 border-0 text-xs"
                  >
                    {service.name}
                  </Badge>
                ))}
                {services.length > 3 && (
                  <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                    +{services.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Footer - Push to bottom */}
          <div className="mt-auto flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center gap-3 pt-4 border-t border-gray-100">
            <div className="text-xs 2xl:text-sm text-gray-600">
              Disponível hoje
            </div>
            <Button
              className="cursor-pointer w-full 2xl:w-auto"
              variant="outline"
              onClick={handleSchedule}
            >
              Ver agenda e agendar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
